import React from 'react';
import stylesMessages from './Dialogs.module.scss'

export const UserBlockMessages = ({getUserDialog},chats) => {
  console.log(Object.entries(chats))
  return (
    <div className={stylesMessages.user_block}>
      {/* {Object.entries(chats)?.map((chat) => (
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
      ))} */}
    </div>
  );
};
