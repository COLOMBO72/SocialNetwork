import React from 'react';
import stylesMessages from './Dialogs.module.scss';

const Message = () => {
  return (
    <div className={stylesMessages.messageblock}>
      <div>
        <img src="./assets/null_ava.jpg" width={40} />
        <span className={stylesMessages.message_time}>just now</span>
      </div>
      <span className={stylesMessages.message_text}>message</span>
    </div>
  );
};

export default Message;
