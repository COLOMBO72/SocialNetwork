import React from 'react';
import { useAppSelector } from '../Redux/store';
import { selectUser } from '../Redux/user/userSlice';
import stylesProfile from './Profile.module.scss';
import ButtonForm from '../Forms/button';
import null_ava from '../assets/null_ava.jpg';
import { EditModule } from './EditModule';

const EditProfile = ({ setEditMode, currentUser }) => {
  const [change, setChange] = React.useState(false);
  const { username, location, aboutMe, photoURL, status, YO } = useAppSelector(selectUser);
  if (change) {
    return <EditModule currentUser={currentUser} setChange={setChange} />;
  }
  return (
    <div className={stylesProfile.edit_wrapper}>
      <div className={stylesProfile.profile_edit}>
        <h2>Settings profile</h2>
        <div className={stylesProfile.photoURL}>
          <img src={photoURL} />
        </div>
        <div className={stylesProfile.username}>
          <span>Name: {username}</span>
        </div>
        <div className={stylesProfile.status}>
          <span>Status: {status}</span>
        </div>
        <div className={stylesProfile.location}>
          <span>Location: {location}</span>
        </div>
        <div className={stylesProfile.old}>
          <span>Years old: {YO}</span>
        </div>
        <div className={stylesProfile.aboutme}>
          <span>About me: {aboutMe}</span>
        </div>
        <div className={stylesProfile.profile_edit_buttons}>
          <ButtonForm title={'Edit'} CallFunction={() => setChange(true)} />
          <ButtonForm title={'Exit'} CallFunction={() => setEditMode(false)} />
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
