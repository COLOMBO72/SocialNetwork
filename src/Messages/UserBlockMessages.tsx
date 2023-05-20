import React from 'react';
import stylesMessages from './Dialogs.module.scss'

export const UserBlockMessages = ({ username, photoURL }) => {
  return (
    <div className={stylesMessages.user_block}>
      <img src={photoURL} />
      <div className={stylesMessages.user_info_block}>
        <span>{username}</span>
        <div className={stylesMessages.location}>
          <span>Last message here</span>
        </div>
      </div>
    </div>
  );
};
