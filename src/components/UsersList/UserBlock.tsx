import React from 'react';
import stylesUsers from './Users.module.scss';
import { Link, useNavigate } from 'react-router-dom';

const UserBlock = ({ username, location, photoURL,uid }) => {
  return (
    <div className={stylesUsers.user_block}>
      <Link to={`${uid}`}><img src={photoURL}/></Link>
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
