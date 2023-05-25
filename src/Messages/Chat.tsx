import React from 'react';
import stylesMessages from './Dialogs.module.scss';
import Messages from './Messages';
import { useAppSelector } from '../Redux/store';
import { selectDialogs } from '../Redux/dialogs/dialogsSlice';
import { selectUser } from '../Redux/user/userSlice';
import icon_close from '../assets/icon-close.png'
import icon_share from '../assets/icon-share.png'
import icon_send from '../assets/icon-send.png'
import { handleSendMessage } from '../hooks/api';

const Chat = ({dialog,setDialog}) => {
  const [text, setText] = React.useState('');
  const [img, setImg] = React.useState(null);
  const { user, dialogId } = useAppSelector(selectDialogs);
  const { uid } = useAppSelector(selectUser);
  
  const onClickFunction = () => {
    handleSendMessage(text,img,dialogId,user,uid)
    setText('');
  };

  if (!user) {
    return <div>Chose user and start chat!</div>;
  }
  return (
    <div className={dialog ? stylesMessages.chat_wrapper_active : stylesMessages.chat_wrapper_none}>
      <div className={stylesMessages.user_info_chat}>
        <div>
          <img src={user.photoURL} width={40} />
          <span>{user.username}</span>
        </div>
        <img onClick={()=>setDialog(false)} className={stylesMessages.imgback} src={icon_close} width={30} />
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
