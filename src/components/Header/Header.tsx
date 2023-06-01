import React from 'react';
import stylesHeader from './Header.module.scss';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../Redux/store';
import { selectUser } from '../../Redux/user/userSlice';
import { signOut } from '../../Redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import Preloader from '../Loading/Preloader';
import { setLogout } from '../../Redux/dialogs/dialogsSlice';
import profile_logo from '../assets/profile_logo_navbar.png';
import settings_logo from '../assets/settings_logo_navbar.png';
import messages_logo from '../assets/messages_logo_navbar.png';
import users_logo from '../assets/users_logo_navbar.png';
import news_logo from '../assets/news_logo_navbar.png';

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const onClickRemove = () => {
    setLoading(true);
    dispatch(signOut());
    setLoading(false);
    navigate('/login');
    dispatch(setLogout());
  };
  const { username } = useAppSelector(selectUser);
  if (loading) {
    <Preloader />;
  }
  return (
    <div className={stylesHeader.nav_wrapper}>
      <nav>
        <Link to={'/profile'}>
          <img src={profile_logo} width={30} /> Profile
        </Link>

        <Link to={'/messages'}>
          <img src={messages_logo} width={30} /> Messages
        </Link>

        <Link to={'/users'}>
          <img src={users_logo} width={30} /> Users
        </Link>

        <Link to={'/news'}>
          <img src={news_logo} width={30} /> News
        </Link>
      </nav>
      <button onClick={onClickRemove}>Logout from {username}</button>
    </div>
  );
};

export default Header;
