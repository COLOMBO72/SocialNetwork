import { createUser, db, signInUser } from './firebase';
import './firebase';
import { collection, getDoc, setDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { getCurrentUserId } from './Redux/dialogs/dialogsSlice';
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { storage } from './firebase';
import { v4 as uu } from 'uuid';
import { signIn } from './Redux/user/userSlice';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

export const handleSendMessage = async (text, img, dialogId, user, uid) => {
  if (!text || text.length > 300) {
    alert('No text');
  } else {
    if (img) {
      const storageRef = ref(storage, uu());
      const uploadTask = uploadBytesResumable(storageRef, img);
      try {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          await updateDoc(doc(db, 'dialogs', dialogId), {
            messages: arrayUnion({
              id: uu(),
              text,
              sendId: user.uid,
              date: Timestamp.now(),
              img: downloadURL,
            }),
          });
        });
      } catch (error) {
        console.error();
      }
    } else {
      try {
        await updateDoc(doc(db, 'dialogs', dialogId), {
          messages: arrayUnion({
            id: uu(),
            text,
            sendId: uid,
            date: Timestamp.now(),
          }),
        });
      } catch (error) {
        console.error();
      }
    }
    await updateDoc(doc(db, 'userDialogs', uid), {
      [dialogId + '.lastMessage']: {
        text,
      },
      [dialogId + '.date']: serverTimestamp(),
    });
    await updateDoc(doc(db, 'userDialogs', user.uid), {
      [dialogId + '.lastMessage']: {
        text,
      },
      [dialogId + '.date']: serverTimestamp(),
    });
  }
};

export const handleSelectSearch = async (setLoading, user, currentUser, setUser, setUsername) => {
  setLoading(true);
  // Проверяет есть ли диалог в firestore, если нет - то создаёт
  const combinedId =
    currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
  try {
    const res = await getDoc(doc(db, 'dialogs', combinedId));
    if (!res.exists()) {
      // Создаёт коллекцию в dialogs
      await setDoc(doc(db, 'dialogs', combinedId), { messages: [] });

      await updateDoc(doc(db, 'userDialogs', currentUser.uid), {
        [combinedId + '.userInfo']: {
          uid: user.uid,
          username: user.username,
          photoURL: user.photoURL,
        },
        [combinedId + '.date']: serverTimestamp(),
      });
      await updateDoc(doc(db, 'userDialogs', user.uid), {
        [combinedId + '.userInfo']: {
          uid: currentUser.uid,
          username: currentUser.username,
          photoURL: currentUser.photoURL,
        },
        [combinedId + '.date']: serverTimestamp(),
      });
    }
  } catch (error) {
    console.error();
    setLoading(false);
  }
  setUser(null);
  setUsername('');
  setLoading(false);
};

export const onHandleLogin = async (
  email: string,
  password: string,
  setLoading,
  setError,
  error,
  dispatch,
  navigate,
) => {
  // Инициализируем метод firebase который показывает базу данных.
  if (!email || !password) {
    alert('Enter email or password');
    return;
  } else {
    try {
      // Асинхронная функция firebase которая логинит пользователя.
      setLoading(true);
      let auth = await signInUser(email, password);
      setLoading(false);
      const user = auth.user;
      // Асинхронная функция вызывающая базу данных users.
      // Диспатчит в store значения из базы данных.
      setLoading(true);
      const docSnap = await getDoc(doc(db, 'users', user.uid));
      if (docSnap.exists()) {
        dispatch(
          signIn({
            uid: docSnap.data().uid,
            status: docSnap.data().status,
            location: docSnap.data().location,
            token: docSnap.data().token,
            email: docSnap.data().email,
            YO: docSnap.data().YO,
            photoURL: docSnap.data().photoURL,
            aboutMe: docSnap.data().aboutMe,
            username: docSnap.data().username,
          }),
        );
        dispatch(getCurrentUserId(docSnap.data().uid));
        setLoading(false);
      } else {
        setError(error);
        setLoading(false);
      }
      // Перевод на страницу profile.
      navigate('/profile');
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }
};

export const onHandleRegister = async (
  pass,
  name,
  file,
  email,
  locationUser,
  old,
  navigate,
  setLoading,
) => {
  const usersRef = collection(db, 'users');
  const storage = getStorage();
  const storageRef = ref(storage, name);
  const uploadTask = uploadBytesResumable(storageRef, file);
  try {
    // 1: создаёт пользователя и записывает данные в firebase authefication.
    const res = await createUser(email, pass);
    // 2: создаёт функцию в которой есть асинхронный запрос на сервер для отправления введённых данных.
    await uploadBytesResumable(storageRef, file).then(() => {
      getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
        try {
          // Отправка в storage аватарки с именем.
          await updateProfile(res.user, {
            displayName: name,
            photoURL: downloadURL,
          });
          // Отправка в firestore введённых данных.
          await setDoc(doc(usersRef, `${res.user.uid}`), {
            uid: res.user.uid,
            username: name,
            email: res.user.email,
            location: locationUser,
            aboutMe: 'Here must be info about me',
            photoURL: downloadURL,
            status: 'Just react developer',
            YO: old,
            token: res.user.refreshToken,
          });
          await setDoc(doc(db, 'userDialogs', res.user.uid), {});
          navigate('/login');
          setLoading(false);
        } catch (error) {
          console.error();
          setLoading(false);
        }
      });
    });
  } catch (error) {
    console.error();
    setLoading(false);
  }
};
