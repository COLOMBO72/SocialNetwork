import React from 'react';
import stylesMessages from './Dialogs.module.scss';
import Messages from './Messages';
import { useAppDispatch, useAppSelector } from '../Redux/store';
import { selectDialogs } from '../Redux/dialogs/dialogsSlice';
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { v4 as uu } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { selectUser } from '../Redux/user/userSlice';
import icon_close from '../assets/icon-close.png'
import icon_share from '../assets/icon-share.png'
import icon_send from '../assets/icon-send.png'

const Chat = () => {
  const [text, setText] = React.useState('');
  const [img, setImg] = React.useState(null);
  const { user, dialogId } = useAppSelector(selectDialogs);
  const { uid } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const inputValue = React.useRef(null);
  const handleSend = async () => {
    if (!text || text.length>300) {
      alert('No text');
    } else {
      if (img) {
        const storageRef = ref(storage, uu());
        const uploadTask = uploadBytesResumable(storageRef, img);
        try {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, 'dialogs', dialogId), {
              messages: arrayUnion({
                id: uu(),
                text,
                sendId: user.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        } catch (error) {
          console.error();
        }
      } else {
        try {
          await updateDoc(doc(db, 'dialogs', dialogId), {
            messages: arrayUnion({
              id: uu(),
              text,
              sendId: uid,
              date: Timestamp.now(),
            }),
          });
        } catch (error) {
          console.error();
        }
      }
      await updateDoc(doc(db, 'userDialogs', uid), {
        [dialogId + '.lastMessage']: {
          text,
        },
        [dialogId + '.date']: serverTimestamp(),
      });
      await updateDoc(doc(db, 'userDialogs', user.uid), {
        [dialogId + '.lastMessage']: {
          text,
        },
        [dialogId + '.date']: serverTimestamp(),
      });
    }
  };

  const onClickFunction = () => {
    handleSend();
    setText('');
  };

  if (!user) {
    return <div>Chose user and start chat!</div>;
  }
  return (
    <div className={stylesMessages.chat_wrapper_active}>
      <div className={stylesMessages.user_info_chat}>
        <div>
          <img src={user.photoURL} width={40} />
          <span>{user.username}</span>
        </div>
        <img className={stylesMessages.imgback} src={icon_close} width={30} />
      </div>
      <div className={stylesMessages.chat}>
        <Messages />
      </div>
      <div className={stylesMessages.input_wrapper}>
        <input
          type="file"
          style={{ display: 'none' }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <img src={icon_share} width={20} />
        </label>
        <input
          className={stylesMessages.input_text}
          ref={inputValue}
          type="text"
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={onClickFunction}>
          <img src={icon_send} width={30} />
        </button>
      </div>
    </div>
  );
};

export default Chat;
