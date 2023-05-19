import React from 'react';
import { useNavigate } from 'react-router-dom';
import { selectUser, signIn } from '../Redux/user/userSlice';
import { useAppDispatch, useAppSelector } from '../Redux/store';
import FormLogin from './FormLogin';
import { db, signInUser } from '../firebase';
import { useAuth } from '../hooks/use-auth';
import stylesLogin from './Login.module.scss';
import { doc, getDoc } from 'firebase/firestore';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuth } = useAuth();

  // Функция. Вызывается при нажатии, принимает в себя value инпутов из FormLogin.
  const handleLogin = async (email: string, password: string) => {
    // Инициализируем метод firebase который показывает базу данных.
    if (!email || !password) {
      alert('Enter email or password');
      return;
    } else {
      try {
        // Асинхронная функция firebase которая логинит пользователя.
        let auth = await signInUser(email, password);
        const user = auth.user;
        // Асинхронная функция вызывающая базу данных users.
        // Диспатчит в store значения из базы данных.
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
        } else {
          console.error();
        }
        // Перевод на страницу profile.
        navigate('/profile');
      } catch (error) {
        console.error();
      }
    }
  };
  React.useEffect(() => {
    if (isAuth == true) {
      navigate('/profile');
    }
  }, [isAuth]);
  return (
    <div className={stylesLogin.login_page_Wrapper}>
      <h3>Welcome!</h3>
      <FormLogin handleClick={handleLogin} />
    </div>
  );
};

export default Login;
