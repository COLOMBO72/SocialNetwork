import React from 'react';
import { useAppDispatch, useAppSelector } from '../../Redux/store';
import { selectUser, signIn } from '../../Redux/user/userSlice';
import stylesProfile from './Profile.module.scss';
import ButtonForm from '../Forms/button';
import { doc, collection, updateDoc, deleteDoc } from 'firebase/firestore';
import { db, storage } from '../../firebase';
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { deleteUser, updateProfile } from 'firebase/auth';
import icon_file from '../assets/icon-fileload.png';
import Preloader from '../Loading/Preloader';
import { signOut } from '../../Redux/user/userSlice';

// export const ModalDelete = ({ setModal }) => {
//   const auth = getAuth();
//   const dispatch = useAppDispatch();
//   const currentUser = auth.currentUser;
//   const onDeleteAccount = async () => {
//     setModal(false);
//     await deleteDoc(doc(db, 'users', currentUser.uid));
//     await deleteDoc(doc(db, 'userDialogs', currentUser.uid));
//     await deleteObject(ref(storage, currentUser.displayName));
//     await deleteUser(currentUser);
//     dispatch(signOut());
//   };

//   return (
//     <div className={stylesProfile.delete_wrap}>
//       <input name="pass" type="password" />
//       <label htmlFor="pass">Confirm your password</label>
//       <ButtonForm title={'Confirm'} CallFunction={onDeleteAccount} />
//     </div>
//   );
// };

export const EditModule = ({ currentUser, setChange }) => {
  const { username, location, aboutMe, photoURL, status, YO, uid, email, token } =
    useAppSelector(selectUser);
  const [loading, setLoading] = React.useState(false);
  // const [modal, setModal] = React.useState(false);
  const [nameE, setName] = React.useState(username);
  const [statusE, setStatus] = React.useState(status);
  const [locationE, setLocation] = React.useState(location);
  const [aboutMeE, setAboutMe] = React.useState(aboutMe);
  const [yoE, setYO] = React.useState(YO);
  // const refStatus = React.useRef<HTMLInputElement>();
  // const refLocation = React.useRef<HTMLInputElement>();
  // const refAbout = React.useRef<HTMLInputElement>();
  // const refYO = React.useRef<HTMLInputElement>();
  // const refPhoto = React.useRef<HTMLInputElement>();
  const refInput = React.useRef<HTMLInputElement>();
  const dispatch = useAppDispatch();

  const onDeleteAccount = async () => {
    await deleteDoc(doc(db, 'users', currentUser.uid));
    await deleteDoc(doc(db, 'userDialogs', currentUser.uid));
    await deleteObject(ref(storage, currentUser.displayName));
    await deleteUser(currentUser);
    dispatch(signOut());
  };

  const onChangeData = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (refInput.current.value) {
      try {
        await updateProfile(currentUser, {
          displayName: nameE,
          photoURL: photoURL,
        });
        await updateDoc(doc(collection(db, 'users'), `${currentUser.uid}`), {
          username: nameE,
          location: locationE,
          aboutMe: aboutMeE,
          photoURL: photoURL,
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
          photoURL: photoURL,
          status: statusE,
          YO: yoE,
          uid: uid,
          email: email,
          token: token,
        }),
      );
      setChange(false);
      setLoading(false);
    } else {
      setChange(false);
      setLoading(true);
      alert('Field empty');
    }
  };

  const updatePhoto = async (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    const storage = getStorage();
    const storageRef = ref(storage, nameE);
    const uploadTask = uploadBytesResumable(storageRef, file);
    await uploadBytesResumable(storageRef, file).then(() => {
      getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
        if (file) {
          try {
            await updateProfile(currentUser, {
              displayName: nameE,
              photoURL: downloadURL,
            });
          } catch (error) {
            console.error();
          }
        } else {
          alert('Chose image');
        }
      });
    });
  };

  if (loading) {
    return <Preloader />;
  }
  if (!currentUser) {
    return <div>Error to get user, please update page</div>;
  }
  // } else if (modal) {
  //   return <ModalDelete setModal={setModal} />;
  // }
  return (
    <>
      <div className={stylesProfile.edit_wrapper}>
        <form onSubmit={onChangeData} className={stylesProfile.profile_edit}>
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
          <div className={stylesProfile.profile_edit_buttons}>
            <ButtonForm title={'Save'} CallFunction={() => {}} />
          </div>
        </form>
        <div className={stylesProfile.profile_edit_buttons2}>
          <form className={stylesProfile.choseImage} onSubmit={updatePhoto}>
            <div>
              <span>Chose photo</span>
              <input style={{ display: 'none' }} type="file" id={'file'} />
              <label htmlFor="file">
                <img src={icon_file} />
              </label>
              <button>Save photo</button>
            </div>
          </form>
          <ButtonForm title={'Back'} CallFunction={() => setChange(false)} />
          <button onClick={onDeleteAccount} className={stylesProfile.deleteAcc}>
            Delete account
          </button>
        </div>
      </div>
    </>
  );
};
