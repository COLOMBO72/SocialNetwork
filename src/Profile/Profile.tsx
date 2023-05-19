import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../Redux/store';
import { useAppSelector } from '../Redux/store';
import { useAuth } from '../hooks/use-auth';
import { selectUser, signOut } from '../Redux/user/userSlice';
import stylesProfile from './Profile.module.scss';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuth } = useAuth();
  const { username, email, location, aboutMe, photoURL, status, YO } =
    useAppSelector(selectUser);
  //Функция. При нажатии делает диспатч в слайс, который воспроизводит actions
  const onClickRemove = () => {
    dispatch(signOut())
    navigate('/login');
  };
  const onclickcheck = () => {
    console.log(username)
  };

  React.useEffect(() => {
    if (isAuth == false) {
      navigate('/login');
    }
  }, [isAuth]);
  return (
    <div className={stylesProfile.profile_wrapper}>
      <div className={stylesProfile.profile_block}>
        <div className={stylesProfile.ava_wrapper}>
          <img src={photoURL ? photoURL : 'assets/null_ava.jpg'} />
        </div>
        <div className={stylesProfile.profile_info_block}>
          <span>{status}</span>
          <span>My name: {username}</span>
          <span>Where I am: {location}</span>
          <span>About me: {aboutMe}</span>
          <span>Date of birthday: {YO}</span>
          <button onClick={onClickRemove}>Sign out from {email}</button>
        </div>
      </div>
      <div className={stylesProfile.photos_block}>
        <img onClick={onclickcheck} src="/assets/zuckerberg.jpg" width={150} height={150} />
        <img src="/assets/durov.jpeg" width={150} height={150} />
      </div>
    </div>
  );
};

export default Profile;
