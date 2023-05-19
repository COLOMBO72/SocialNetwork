import React from 'react';
import FormRegister from './FormRegister';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';
import stylesLogin from './Login.module.scss';
import '../firebase';
import { RegisterFunction } from '../hooks/api';

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
  ) => {
    RegisterFunction(email, password, name, locationUser, old);
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
