import React from 'react';
import stylesMessages from './Dialogs.module.scss'
import Messages from './Messages';

const Chat = () => {
  return (
    <div className={stylesMessages.chat_wrapper}>
      <div className={stylesMessages.chat}>
        <Messages/>
      </div>
      <div className={stylesMessages.input_wrapper}>
        <input type="text" />
        <button>Send</button>
        <img src="./assets/icon-share.png" width={20} />
      </div>
    </div>
  );
};

export default Chat;
