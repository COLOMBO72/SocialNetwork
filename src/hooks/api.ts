import { createUser, db, signInUser } from '../firebase';
import '../firebase';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { getAuth, updateProfile } from 'firebase/auth';
import { useAppDispatch } from '../Redux/store';
import { signIn } from '../Redux/user/userSlice';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

export const RegisterFunction = async (
  email: string,
  password: string,
  name: string,
  locationUser: string,
  old: string,
  file,
) => {
  const usersRef = collection(db, 'users');
  const storage = getStorage();
  const storageRef = ref(storage, name);
  const uploadTask = uploadBytesResumable(storageRef, file);
  // Вызывает две асинхронные функции:
  try {
    // 1: создаёт пользователя и записывает данные в firebase authefication.
    const res = await createUser(email, password);
    // 2: создаёт функцию в которой есть асинхронный запрос на сервер для отправления введённых данных.
    const writeUserData = async (old: string, name: string, locationUser: string) => {
      getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
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
      });
    };
    // Вызывается функция в функции (замыкание).
    writeUserData(old, name, locationUser);
  } catch (error) {
    console.error();
  }
};
