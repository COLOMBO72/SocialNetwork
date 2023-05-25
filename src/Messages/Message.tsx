import React, { useEffect, useRef } from 'react';
import stylesMessages from './Dialogs.module.scss';
import { useAppSelector } from '../Redux/store';
import { selectDialogs } from '../Redux/dialogs/dialogsSlice';
import { selectUser } from '../Redux/user/userSlice';

const Message = ({ message }) => {
  const { user } = useAppSelector(selectDialogs);
  const { username, photoURL, uid } = useAppSelector(selectUser);
  const ref = useRef();

  // useEffect(()=>{
  //   ref.current?.scrollIntoView({behavior: "smooth"})
  // },[message])
  console.log(message.sendId);
  console.log(uid);
  return (
    <div
      ref={ref}
      className={
        message.sendId === uid
          ? stylesMessages.messageblock_owner
          : stylesMessages.messageblock_other
      }
    >
      <div>
        <img src={message.sendId === uid ? photoURL : user.photoURL} width={40} />
        <span className={stylesMessages.message_time}>just now</span>
      </div>
      <span className={stylesMessages.message_text}>{message.text}</span>
    </div>
  );
};

export default Message;
