import React from 'react';
import { useAuth } from '../hooks/use-auth';
import { useNavigate } from 'react-router-dom';
import stylesMessages from './Dialogs.module.scss';
import Navbar from './Navbar';
import Chat from './Chat';

const Dialogs = () => {
  const [dialog, setDialog] = React.useState(false);
  const { isAuth } = useAuth();
  const navigate = useNavigate();
  React.useEffect(() => {
    if (isAuth == false) {
      navigate('/login');
    }
  }, [isAuth]);
  return (
    <div className={stylesMessages.wrapper}>
      <Navbar dialog={dialog} setDialog={setDialog} />
      <Chat dialog={dialog} setDialog={setDialog} />
    </div>
  );
};

export default Dialogs;
