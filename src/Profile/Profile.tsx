import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../Redux/store';
import { useAppSelector } from '../Redux/store';
import { useAuth } from '../hooks/use-auth';
import { selectUser } from '../Redux/user/userSlice';
import stylesProfile from './Profile.module.scss';

const Profile: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuth } = useAuth();
  const { username, location, aboutMe, photoURL, status, YO } = useAppSelector(selectUser);
  //Функция. При нажатии делает диспатч в слайс, который воспроизводит actions

  React.useEffect(() => {
    if (isAuth == false) {
      navigate('/login');
    }
  }, [isAuth]);
  return (
    <div className={stylesProfile.profile_wrapper}>
      {/* {loading ? <Skeleton/> : ''}
      {errorMsg && <div className="error">{errorMsg}</div>} */}
      <div className={stylesProfile.profile_block}>
        <div className={stylesProfile.ava_wrapper}>
          <img src={photoURL ? photoURL : 'assets/null_ava.jpg'} />
        </div>
        <div className={stylesProfile.profile_info_block}>
          <div className={stylesProfile.namewrap}>
            <span>{username}</span>
          </div>
          <span>{status}</span>
          <span> {location}</span>
          <span>{YO}</span>
        </div>
        <div className={stylesProfile.aboutme_block}>
          <div className={stylesProfile.aboutme_wrap}>
            <span>About me</span>
          </div>
          <span>{aboutMe}</span>
          <span>My interests in coding</span>
        </div>
        <div className={stylesProfile.buttons}>
          <button>Add to friends</button>
          <button>Delete from friends</button>
          <button>Edit profile</button>
          <button>Send message</button>
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
