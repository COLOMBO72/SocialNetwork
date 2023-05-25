import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../Redux/store';
import { useAppSelector } from '../Redux/store';
import { useAuth } from '../hooks/use-auth';
import { selectUser } from '../Redux/user/userSlice';
import stylesProfile from './Profile.module.scss';
import dialogsSlice from '../Redux/dialogs/dialogsSlice';
import null_ava from '../../public/assets/null_ava.jpg';
import EditProfile from './EditProfile';
import ButtonForm from '../Forms/button';

const Profile = () => {
  const [loading, setLoading] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);
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
    <>
      {editMode ? (
        <EditProfile setEditMode={setEditMode}/>
      ) : (
        <div className={stylesProfile.profile_wrapper}>
          <div className={stylesProfile.profile_block}>
            <div className={stylesProfile.ava_wrapper}>
              <img src={photoURL ? photoURL : '/assets/null_ava.jpg'} />
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
              <ButtonForm title={"Edit profile"} CallFunction={()=>setEditMode(true)}/>
              <button>Send message</button>
            </div>
          </div>
          <div className={stylesProfile.photos_block}>
            <img src="/assets/zuckerberg.jpg" width={150} height={150} />
            <img src="/assets/durov.jpeg" width={150} height={150} />
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
