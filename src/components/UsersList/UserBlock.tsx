import React from 'react';
import stylesUsers from './Users.module.scss';
import { Link } from 'react-router-dom';
import { handleAddFriend } from '../../api';
import { useAppSelector } from '../../Redux/store';
import { selectUser } from '../../Redux/user/userSlice';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';

const UserBlock = (user) => {
  const { uid } = useAppSelector(selectUser);
  const [ids, setIds] = React.useState([]);
  const friendAdd = async () => {
    handleAddFriend(uid, user);
  };

  React.useEffect(() => {
    const docSnap = async () => {
      const snap = await getDoc(doc(db, 'userFriends', uid));
      if (snap.exists()) {
        Object.entries(snap.data()).map((data) => {
          if (data[0] === user.uid) {
            setIds(data[1].userInfo.uid);
          }
        });
      } else {
        console.error();
      }
    };
    docSnap();
  }, [ids]);
  console.log(ids);
  return (
    <div className={stylesUsers.user_block}>
      <Link to={`${user.uid}`}>
        <img src={user.photoURL} />
      </Link>
      <div className={stylesUsers.user_info_block}>
        <span>{user.username}</span>
        <div className={stylesUsers.location}>
          <span>{user.location}</span>
        </div>
        <div>
          {ids == user.uid ? (
            <button>Send message</button>
          ) : (
            <button onClick={friendAdd}>Add friend</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserBlock;
