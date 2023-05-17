import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../Redux/store';
import { useAppSelector } from '../Redux/store';
import { useAuth } from '../hooks/use-auth';
import { removeUser, selectUser } from '../Redux/user/userSlice';
import stylesProfile from './Profile.module.scss';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuth } = useAuth();
  const {email,status,aboutMe,name,location,photoURL} = useAppSelector(selectUser)
  //Функция. При нажатии делает диспатч в слайс, который воспроизводит actions
  const onClickRemove = () => {
    dispatch(removeUser());
    navigate('/login');
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
          <img src={photoURL ? photoURL : "assets/null_ava.jpg"} />
        </div>
        <div className={stylesProfile.profile_info_block}>
          <span>{status}</span>
          <span>{name}</span>
          <span>{location}</span>
          <span>{aboutMe}</span>
          <button onClick={onClickRemove}>Sign out {email}</button>
        </div>
      </div>
      <div className={stylesProfile.photos_block}>
        <img src="/assets/zuckerberg.jpg" width={150} height={150} />
        <img src="/assets/durov.jpeg" width={150} height={150} />
      </div>
    </div>
  );
};

export default Profile;
