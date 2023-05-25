import React from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import Preloader from '../Loading/Preloader';
import Search from './Search';
import stylesMessages from './Dialogs.module.scss';
import { useAppDispatch, useAppSelector } from '../Redux/store';
import { selectUser } from '../Redux/user/userSlice';
import { setUserDialog } from '../Redux/dialogs/dialogsSlice';

type userDialog = {
  username: string;
  uid: string;
  photoURL: string;
};

const Navbar = ({ setDialog }) => {
  const [loading, setLoading] = React.useState(false);
  const [chats, setChats] = React.useState([]);
  const { uid } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const getUserDialog = async (obj: userDialog) => {
    dispatch(setUserDialog(obj));
    setDialog(true);
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
    <div className={stylesMessages.usersList_wrapper}>
      <Search />
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <div
            onClick={() => getUserDialog(chat[1].userInfo)}
            key={chat[0]}
            className={stylesMessages.user_block}
          >
            <img src={chat[1].userInfo.photoURL} />
            <div className={stylesMessages.user_info_block}>
              <span>{chat[1].userInfo.username}</span>
              <div className={stylesMessages.lastmessage}>
                <span>{chat[1].lastMessage?.text}</span>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};
export default Navbar;
