import React from 'react';
import stylesHeader from './Header.module.scss';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../Redux/store';
import { selectUser } from '../Redux/user/userSlice';
import { signOut } from '../Redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import Preloader from '../Loading/Preloader';

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const onClickRemove = () => {
    setLoading(true);
    dispatch(signOut());
    setLoading(false);
    navigate('/login');
  };
  const { username } = useAppSelector(selectUser);
  if (loading) {
    <Preloader />;
  }
  return (
    <div className={stylesHeader.nav_wrapper}>
      <nav>
        <Link to={'/profile'}>
          <img src={'./assets/profile_logo_navbar.png'} width={30} /> Profile
        </Link>

        <Link to={'/messages'}>
          <img src={'./assets/messages_logo_navbar.png'} width={30} /> Messages
        </Link>

        <Link to={'/users'}>
          <img src={'./assets/users_logo_navbar.png'} width={30} /> Users
        </Link>

        <Link to={'/news'}>
          <img src={'./assets/news_logo_navbar.png'} width={30} /> News
        </Link>
        <Link to={'/settings'}>
          <img src={'./assets/settings_logo_navbar.png'} width={30} /> Settings
        </Link>
      </nav>
      <button onClick={onClickRemove}>Logout from {username}</button>
    </div>
  );
};

export default Header;
