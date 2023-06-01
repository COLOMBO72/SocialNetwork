import React from 'react';
import { deleteDoc, deleteField, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import Preloader from '../Loading/Preloader';
import Search from './Search';
import stylesMessages from './Dialogs.module.scss';
import { useAppDispatch, useAppSelector } from '../../Redux/store';
import { selectUser } from '../../Redux/user/userSlice';
import { setUserDialog } from '../../Redux/dialogs/dialogsSlice';
import icon_close from '../assets/icon-close.png';
import { getAuth } from 'firebase/auth';
import { useSubmit } from 'react-router-dom';

type userDialog = {
  username: string;
  uid: string;
  photoURL: string;
};

const Navbar = ({ dialog, setDialog }) => {
  const [loading, setLoading] = React.useState(true);
  const [chats, setChats] = React.useState([]);
  const { uid } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const auth = getAuth();
  const currentUser = auth.currentUser;

  const getUserDialog = async (obj: userDialog) => {
    dispatch(setUserDialog(obj));
    setDialog(true);
  };

  const deleteDialog = async (obj) => {
    //   const combinedId = obj.uid + currentUser.uid;
    //   await deleteDoc(doc(db, 'dialogs', combinedId));
    //   await updateDoc(doc(db,'userDialogs', currentUser.uid), {
    //     combinedId: deleteField()
    // });
  };

  React.useEffect(() => {
    const getChats = () => {
      setLoading(true);
      const getUD = onSnapshot(doc(db, 'userDialogs', uid), (doc) => {
        //@ts-ignore
        setChats(doc.data());
      });
      return () => {
        getUD();
      };
    };
    uid && getChats();
    setLoading(false);
  }, [uid]);
  if (loading) {
    return <Preloader />;
  }
  return (
    <div
      className={
        dialog ? stylesMessages.usersList_wrapper_short : stylesMessages.usersList_wrapper_full
      }
    >
      <h1>Users dialogs</h1>
      <Search />
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <div key={chat[0]} className={stylesMessages.user_block}>
            <img
              onClick={() => getUserDialog(chat[1].userInfo)}
              className={stylesMessages.avatar}
              src={chat[1].userInfo.photoURL}
            />
            <div
              onClick={() => getUserDialog(chat[1].userInfo)}
              className={stylesMessages.user_info_block}
            >
              <span>{chat[1].userInfo.username}</span>
              <div className={stylesMessages.lastmessage}>
                <div>{chat[1].lastMessage?.text}</div>
              </div>
            </div>
            <img
              onClick={() => deleteDialog(chat[1].userInfo)}
              className={stylesMessages.deleteDialog}
              src={icon_close}
              width={20}
            />
          </div>
        ))}
    </div>
  );
};
export default Navbar;
