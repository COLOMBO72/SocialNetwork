import React from 'react';
import { useAppSelector } from '../Redux/store';
import { selectUser } from '../Redux/user/userSlice';
import stylesProfile from './Profile.module.scss';
import ButtonForm from '../Forms/button';
import settings_logo from '../assets/settings_logo_navbar.png';
import null_ava from '../assets/null_ava.jpg';

const EditProfile = ({ setEditMode }) => {
  const { username, location, aboutMe, photoURL, status, YO } = useAppSelector(selectUser);
  return (
    <div>
      <div className={stylesProfile.profile_wrapper_edit}>
        <img src={photoURL ? photoURL : null_ava} />
        <div className={stylesProfile.username}>
          <span>Username: {username}</span>
          <img src={settings_logo} width={30} />
        </div>
        <div className={stylesProfile.status}>
          <span>Status: {status}</span>
          <img src={settings_logo} width={30} />
        </div>
        <div className={stylesProfile.location}>
          <span>Location: {location}</span>
          <img src={settings_logo} width={30} />
        </div>
        <div className={stylesProfile.old}>
          <span>Years old: {YO}</span>
          <img src={settings_logo} width={30} />
        </div>
        <div className={stylesProfile.aboutme}>
          <span>About me: {aboutMe}</span>
          <img src={settings_logo} width={30} />
        </div>
        <div>
          <span className={stylesProfile.interests}>Interests: myInterests</span>
          <img src={settings_logo} width={30} />
        </div>
        <ButtonForm title={'Save'} CallFunction={() => setEditMode(false)} />
      </div>
    </div>
  );
};

export default EditProfile;
