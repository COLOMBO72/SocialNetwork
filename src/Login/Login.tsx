import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../Redux/store';
import FormLogin from './FormLogin';
import { useAuth } from '../hooks/use-auth';
import stylesLogin from './Login.module.scss';
import Preloader from '../Loading/Preloader';
import { onHandleLogin } from '../hooks/api';

const Login: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuth } = useAuth();
  // Функция. Вызывается при нажатии, принимает в себя value инпутов из FormLogin.
  const handleLogin = (email: string, password: string) => {
    onHandleLogin(email, password, setLoading, setError, error, dispatch, navigate);
  };
  React.useEffect(() => {
    if (isAuth == true) {
      navigate('/profile');
    }
  }, [isAuth]);
  if (loading) {
    return <Preloader />;
  }
  return (
    <div className={stylesLogin.login_page_Wrapper}>
      <h3>Welcome!</h3>
      <FormLogin error={error} handleClick={handleLogin} />
    </div>
  );
};

export default Login;
