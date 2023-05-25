import React from 'react';
import { useAuth } from '../hooks/use-auth';
import { useNavigate } from 'react-router-dom';
import stylesMessages from './Dialogs.module.scss';
import Navbar from './Navbar';
import Chat from './Chat';
import Preloader from '../Loading/Preloader';

const Dialogs = () => {
  const { isAuth } = useAuth();
  const navigate = useNavigate();
  React.useEffect(() => {
    if (isAuth == false) {
      navigate('/login');
    }
  }, [isAuth]);
  return (
    <div className={stylesMessages.wrapper}>
      <Navbar />
      <Chat />
    </div>
  );
};

export default Dialogs;
