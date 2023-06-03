import React from 'react';
import stylesFriends from './Friends.module.scss';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../Redux/store';
import { selectUser } from '../../Redux/user/userSlice';
import { handleDeleteFriend } from '../../api';

const Friendblock = ({ friend }) => {
  const friendDelete = async () => {
    handleDeleteFriend(uid, friend[1].userInfo);
  };
  const { uid } = useAppSelector(selectUser);
  return (
    <div className={stylesFriends.friendblock_wrapper}>
      <div>
        <img src={friend[1].userInfo.photoURL} />
        <div>
          <span>{friend[1].userInfo.username}</span>
          <Link to={`/messages/${friend[1].userInfo.uid + uid}`}>Send message</Link>
        </div>
      </div>
      <button onClick={friendDelete}>Delete friend</button>
    </div>
  );
};

export default Friendblock;
