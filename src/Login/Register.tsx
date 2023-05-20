import React from 'react';
import { Form, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';
import stylesLogin from './Login.module.scss';
import '../firebase';
import { createUser, db } from '../firebase';
import { collection, doc, setDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { Link } from 'react-router-dom';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { isAuth } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const pass = e.target[1].value;
    const name = e.target[2].value;
    const locationUser = e.target[3].value;
    const old = e.target[4].value;
    const file = e.target[5].files[0];
    const usersRef = collection(db, 'users');
    const storage = getStorage();
    const storageRef = ref(storage, name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    try {
      // 1: создаёт пользователя и записывает данные в firebase authefication.
      const res = await createUser(email, pass);
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
    navigate('/login');
  };
  React.useEffect(() => {
    if (isAuth == true) {
      navigate('/profile');
    }
  }, [isAuth]);
  return (
    <div className={stylesLogin.login_page_Wrapper}>
      <h3>Join Us!</h3>
      <form onSubmit={handleSubmit} className={stylesLogin.login_block}>
        <h1>Register your account</h1>
        <div className={stylesLogin.input}>
          <span>Email</span>
          <input type="email" />
        </div>
        <div className={stylesLogin.input}>
          <span>Password</span>
          <input type="password" />
        </div>
        <div className={stylesLogin.input}>
          <span>Name</span>
          <input type="name" />
        </div>
        <div className={stylesLogin.input}>
          <span>Location</span>
          <input type="location" />
        </div>
        <div className={stylesLogin.input}>
          <span>Years old</span>
          <input type="old" />
        </div>
        <div className={stylesLogin.choseImage}>
          <span>Load your photo</span>
          <input style={{display: "none"}} type="file" id={'file'} />
          <label htmlFor="file">
            <img src="./assets/icon-fileload.png" />
          </label>
        </div>
        <button>Sign Up</button>
        <div className={stylesLogin.link}>
          <span>Already have account?</span>
          <Link to="/login">Sign in! </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
