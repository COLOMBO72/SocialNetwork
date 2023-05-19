import React from 'react';
import stylesHeader from './Header.module.scss';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../Redux/store';
import { selectUser } from '../Redux/user/userSlice';
import { signOut } from '../Redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState('');
  const onClickRemove = () => {
    setLoading(true);
    dispatch(signOut());
    setLoading(false);
    navigate('/login');
  };
  const { username } = useAppSelector(selectUser);
  return (
    <div className={stylesHeader.nav_wrapper}>
      <nav>
        <Link to={'/profile'}>Profile</Link>
        <Link to={'/messages'}>Messages</Link>
        <Link to={'/users'}>Users</Link>
        <Link to={'/news'}>News</Link>
        <Link to={'/settings'}>Settings</Link>
      </nav>
      <button onClick={onClickRemove}>Logout from {username}</button>
    </div>
  );
};

export default Header;
