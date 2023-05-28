import React from 'react';
import { useAppDispatch, useAppSelector } from '../Redux/store';
import { selectUser, signIn } from '../Redux/user/userSlice';
import stylesProfile from './Profile.module.scss';
import ButtonForm from '../Forms/button';
import null_ava from '../assets/null_ava.jpg';
import { signOut } from '../Redux/user/userSlice';
import { doc, deleteDoc, collection, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { getStorage, ref, deleteObject } from 'firebase/storage';
import { deleteUser, updateProfile } from 'firebase/auth';

export const EditModule = ({ currentUser, setChange }) => {
  const { username, location, aboutMe, photoURL, status, YO, uid, email, token } =
    useAppSelector(selectUser);
  const [nameE, setName] = React.useState(username);
  const [statusE, setStatus] = React.useState(status);
  const [locationE, setLocation] = React.useState(location);
  const [aboutMeE, setAboutMe] = React.useState(aboutMe);
  const [yoE, setYO] = React.useState(YO);
  const [photoURLE, setPhotoURL] = React.useState(photoURL);
  // const refStatus = React.useRef<HTMLInputElement>();
  // const refLocation = React.useRef<HTMLInputElement>();
  // const refAbout = React.useRef<HTMLInputElement>();
  // const refYO = React.useRef<HTMLInputElement>();
  // const refPhoto = React.useRef<HTMLInputElement>();
  const refInput = React.useRef<HTMLInputElement>();
  const dispatch = useAppDispatch();
  const storage = getStorage();

  const onChangeData = async () => {
    if (refInput.current.value) {
      try {
        await updateProfile(currentUser, {
          displayName: nameE,
        });
        await updateDoc(doc(collection(db, 'users'), `${currentUser.uid}`), {
          username: nameE,
          location: locationE,
          aboutMe: aboutMeE,
          photoURL: photoURLE,
          status: statusE,
          YO: yoE,
          uid: uid,
          email: email,
          token: token,
        });
      } catch (error) {
        console.error();
      }
      dispatch(
        signIn({
          username: nameE,
          location: locationE,
          aboutMe: aboutMeE,
          photoURL: photoURLE,
          status: statusE,
          YO: yoE,
          uid: uid,
          email: email,
          token: token,
        }),
      );
      setChange(false);
    } else {
      setChange(false);
      alert('Field empty');
    }
  };

  const onDeleteAccount = async () => {
    await deleteDoc(doc(db, 'users', currentUser.uid));
    await deleteDoc(doc(db, 'userDialogs', currentUser.uid));
    await deleteObject(ref(storage, currentUser.displayName));
    await deleteUser(currentUser);
    dispatch(signOut());
  };
  if (!currentUser) {
    return <div>Error to get user, please update page</div>;
  }
  return (
    <>
      <div className={stylesProfile.edit_wrapper}>
        <div className={stylesProfile.profile_edit}>
          <img src={currentUser.photoURL ? currentUser.photoURL : null_ava} width={100} />

          <div className={stylesProfile.username}>
            Name:
            <input
              value={nameE}
              onChange={(e) => setName(e.target.value)}
              className={stylesProfile.profile_edit_input}
              ref={refInput}
            />
          </div>

          <div className={stylesProfile.status}>
            Status:
            <input
              value={statusE}
              onChange={(e) => setStatus(e.target.value)}
              className={stylesProfile.profile_edit_input}
              ref={refInput}
            />
          </div>

          <div className={stylesProfile.location}>
            Location:
            <input
              value={locationE}
              onChange={(e) => setLocation(e.target.value)}
              className={stylesProfile.profile_edit_input}
              ref={refInput}
            />
          </div>

          <div className={stylesProfile.old}>
            Years Old:
            <input
              value={yoE}
              onChange={(e) => setYO(e.target.value)}
              className={stylesProfile.profile_edit_input}
              ref={refInput}
            />
          </div>

          <div className={stylesProfile.aboutme}>
            About me:
            <input
              value={aboutMeE}
              onChange={(e) => setAboutMe(e.target.value)}
              className={stylesProfile.profile_edit_input}
              ref={refInput}
            />
          </div>
          <button onClick={onChangeData}>Save</button>
          <ButtonForm title={'Back'} CallFunction={() => setChange(false)} />
          <button onClick={onDeleteAccount}>Delete account</button>
        </div>
      </div>
    </>
  );
};
