import React from 'react';
import stylesUsers from './Users.module.scss';

const UserBlock = ({ username, location, photoURL }) => {
  return (
    <div className={stylesUsers.user_block}>
      <img src={photoURL} />
      <div className={stylesUsers.user_info_block}>
        <span>{username}</span>
        <div className={stylesUsers.location}>
          <span>{location}</span>
        </div>
        <div>
          <button>Send message</button>
          <button>Add friend</button>
        </div>
      </div>
    </div>
  );
};

export default UserBlock;
