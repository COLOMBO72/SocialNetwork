import React from 'react';
import FormRegister from './FormRegister';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';
import stylesLogin from './Login.module.scss';
import '../firebase';
import { createUser, db, signInUser } from '../firebase';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { getAuth, updateProfile } from 'firebase/auth';
import { useAppDispatch } from '../Redux/store';
import { signIn } from '../Redux/user/userSlice';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { isAuth } = useAuth();

  // Функция, принимающая в себя данные из formRegister, вызывается при нажатии.
  const handleRegister = async (
    email: string,
    password: string,
    name: string,
    locationUser: string,
    old: string,
    e
  ) => {
  const file = e.target.files[0]
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
    // Переводит на страницу логина.
    navigate('/login');
  };
  // Проверка залогинен ли пользователь.
  React.useEffect(() => {
    if (isAuth == true) {
      navigate('/profile');
    }
  }, [isAuth]);
  return (
    <div className={stylesLogin.login_page_Wrapper}>
      <h3>Join Us!</h3>
      <FormRegister handleClick={handleRegister} />
    </div>
  );
};

export default Register;
