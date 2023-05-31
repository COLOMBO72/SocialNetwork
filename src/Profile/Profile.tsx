import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../Redux/store';
import { useAppSelector } from '../Redux/store';
import { useAuth } from '../hooks/use-auth';
import { selectUser } from '../Redux/user/userSlice';
import stylesProfile from './Profile.module.scss';
import EditProfile from './EditProfile';
import ButtonForm from '../Forms/button';
import Preloader from '../Loading/Preloader';
import { getAuth } from 'firebase/auth';
import icon_close from '../assets/icon-close.png';

const Profile = () => {
  const [loading, setLoading] = React.useState(false);
  const [showMore, setShowMore] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);
  const [showFullImg, setShowFullImg] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuth } = useAuth();
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const { username, location, aboutMe, photoURL, status, YO } = useAppSelector(selectUser);
  //Функция. При нажатии делает диспатч в слайс, который воспроизводит actions

  React.useEffect(() => {
    if (isAuth == false) {
      navigate('/login');
    }
  }, [isAuth]);
  if (loading) {
    return <Preloader />;
  }
  return (
    <>
      {editMode ? (
        <EditProfile currentUser={currentUser} setEditMode={setEditMode} />
      ) : (
        <div className={stylesProfile.profile_wrapper}>
          {showFullImg && (
            <div className={stylesProfile.full_ava} onClick={() => setShowFullImg(false)}>
              <img src={photoURL} width={600} />
            </div>
          )}
          <div className={stylesProfile.profile_block}>
            <div className={stylesProfile.profile}>
              <div className={stylesProfile.ava_wrapper}>
                <img
                  onClick={() => setShowFullImg(true)}
                  src={photoURL ? photoURL : '/assets/null_ava.jpg'}
                />
              </div>
              <div className={stylesProfile.profile_info_block}>
                <div className={stylesProfile.namewrap}>
                  <span>{username}</span>
                </div>
                <span>{status}</span>
                {!showMore && <p onClick={() => setShowMore(true)}>Show more...</p>}
                {showMore && (
                  <div onClick={() => setShowMore(false)} className={stylesProfile.aboutme_block}>
                    <span>Country: {location}</span>
                    <span>Years old: {YO}</span>
                    <span>About me: {aboutMe}</span>
                  </div>
                )}
              </div>
            </div>
            <div className={stylesProfile.buttons}>
              <ButtonForm title={'Edit profile'} CallFunction={() => setEditMode(true)} />
            </div>
          </div>
          <div className={stylesProfile.photos_block}>
            <div>photos here</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
