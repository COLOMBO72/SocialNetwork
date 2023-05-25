import React from 'react';
import { useAppDispatch, useAppSelector } from '../Redux/store';
import { selectUser } from '../Redux/user/userSlice';
import stylesProfile from './Profile.module.scss';
import ButtonForm from '../Forms/button';
import settings_logo from '../assets/settings_logo_navbar.png';
import null_ava from '../assets/null_ava.jpg';
import { signOut } from '../Redux/user/userSlice';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { getStorage, ref, deleteObject } from "firebase/storage";
import { deleteUser, getAuth } from 'firebase/auth';

const EditProfile = ({ setEditMode }) => {
  const { username, location, aboutMe, photoURL, status, YO, uid } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const storage = getStorage();
  const userRef = ref(storage, username);
  const auth = getAuth()
  const currentuser = auth.currentUser;
  console.log(currentuser)
  const onDeleteAccount = async () => {
    await deleteDoc(doc(db, 'users', uid));
    await deleteDoc(doc(db, 'userDialogs', uid));
    await deleteObject(userRef);
    await deleteUser(currentuser);
    dispatch(signOut());
  };

  return (
    <div>
      <div className={stylesProfile.profile_wrapper_edit}>
        <img src={photoURL ? photoURL : null_ava} width={100} />
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
        <button onClick={onDeleteAccount}>Delete account</button>
        <ButtonForm title={'Save'} CallFunction={() => setEditMode(false)} />
      </div>
    </div>
  );
};

export default EditProfile;
