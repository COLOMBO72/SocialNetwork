import React from 'react';
import stylesFriends from './Friends.module.scss';
import Friendblock from './Friendblock';
import Preloader from '../Loading/Preloader';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAppSelector } from '../../Redux/store';
import { selectUser } from '../../Redux/user/userSlice';

const Friends = () => {
  const [friends, setFriends] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const { uid } = useAppSelector(selectUser);

  React.useEffect(() => {
    setLoading(true);
    const getFriends = () => {
      
      const getF = onSnapshot(doc(db, 'userFriends', uid), (doc) => {
        if (!doc.data()) {
          alert('Error to get friends');
          setError(true);
          setLoading(false);
        } else {
          //@ts-ignore
          setFriends(doc.data());
          setLoading(false);
        }
      });
      return () => {
        getF();
      };
    };
    uid && getFriends();
  }, [uid]);

  if (!friends) {
    return <div>No friends</div>;
  } else if (loading) {
    return <Preloader />;
  } else if (error) {
    return <div>Error to get friends</div>;
  }
  return (
    <div className={stylesFriends.friends_wrapper}>
      <h3>Friend list</h3>
      {Object.entries(friends) ? (
        Object.entries(friends).map((friend, i) => <Friendblock key={i} friend={friend} />)
      ) : (
        <div>No friends</div>
      )}
    </div>
  );
};

export default Friends;
