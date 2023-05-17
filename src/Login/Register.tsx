import React from 'react';
import FormRegister from './FormRegister';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../firebase';
import { useAuth } from '../hooks/use-auth';
import stylesLogin from './Login.module.scss';
import '../firebase';
import { getDatabase, ref, set } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { isAuth } = useAuth();
  const auth = getAuth();

  // Функция, принимающая в себя данные из formRegister, вызывается при нажатии.
  const handleRegister = async (
    email: string,
    password: string,
    name: string,
    country: string,
    old: string,
  ) => {
    // Вызывает две асинхронные функции:
    try {
      // 1: создаёт пользователя и записывает данные в firebase authefication.
      await createUser(email, password);
      const userId = auth.currentUser.uid;
      const token = auth.currentUser.refreshToken;
      // 2: создаёт функцию в которой есть асинхронный запрос на сервер для отправления введённых данных.
      const writeUserData = (
        userId: string,
        name: string,
        email: string,
        country: string,
        token: string,
      ) => {
        // Отправка введённых данных.
        const db = getDatabase();
        set(ref(db, 'users/' + userId), {
          uid: userId,
          username: name,
          email: email,
          location: country,
          aboutMe: 'Hello its my info',
          photoURL: 'https://i.pinimg.com/170x/e1/d7/94/e1d794ffcee3f85ee53d4a4b47899a55.jpg',
          status: 'Just react developer',
          YO: old,
          token: token,
        });
      };
      // Вызывается функция в функции (замыкание).
      writeUserData(userId, name, email, country, token);
      // Переводит на страницу логина.
      navigate('/login');
    } catch (error) {
      console.error();
    }
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
