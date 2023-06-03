import React from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import stylesProfile from './Profile.module.scss';
import Preloader from '../Loading/Preloader';
import NotFound from '../NotFound/NotFound';
import { useAppSelector } from '../../Redux/store';
import { selectUser } from '../../Redux/user/userSlice';
import { handleAddFriend, handleDeleteFriend } from '../../api';

const ProfileUser: React.FC = () => {
  const { uid } = useAppSelector(selectUser);
  const [friend, setFriend] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [showMore, setShowMore] = React.useState(false);
  const [showFullImg, setShowFullImg] = React.useState(false);
  const [user, setUser] = React.useState<{
    photoURL: string;
    location: string;
    username: string;
    status: string;
    YO: string;
    aboutMe: string;
    uid: string;
    //@ts-ignore
  }>({});
  const URL = useParams();

  const friendAdd = async () => {
    handleAddFriend(uid, user);
  };
  const friendDelete = async () => {
    handleDeleteFriend(uid, user);
  };

  React.useEffect(() => {
    const docSnap = async () => {
      setLoading(true);
      const snap = await getDoc(doc(db, 'users', URL.uid));
      if (snap.exists()) {
        //@ts-ignore
        setUser(snap.data());
        const snapfriend = await getDoc(doc(db, 'userFriends', uid));
        if (snapfriend.exists()) {
          Object.entries(snapfriend.data()).map((user) => {
            if (user[0] == URL.uid) {
              setFriend(true);
            } else {
              setFriend(false);
            }
          });
        } else {
          console.error();
        }
      } else {
        console.error();
        setLoading(false);
      }
      setLoading(false);
    };
    docSnap();
  }, []);

  if (loading) {
    return <Preloader />;
  } else if (!user.username) {
    return <NotFound />;
  }
  return (
    <>
      <div className={stylesProfile.profile_wrapper}>
        {showFullImg && (
          <div className={stylesProfile.full_ava} onClick={() => setShowFullImg(false)}>
            <img src={user.photoURL} width={600} />
          </div>
        )}
        <div className={stylesProfile.profile_block}>
          <div className={stylesProfile.profile}>
            <div className={stylesProfile.ava_wrapper}>
              <img
                onClick={() => setShowFullImg(true)}
                src={user.photoURL ? user.photoURL : '/assets/null_ava.jpg'}
              />
            </div>
            <div className={stylesProfile.profile_info_block}>
              <div className={stylesProfile.namewrap}>
                <span>{user.username}</span>
              </div>
              <span>{user.status}</span>
              {!showMore && <p onClick={() => setShowMore(true)}>Show more...</p>}
              {showMore && (
                <div onClick={() => setShowMore(false)} className={stylesProfile.aboutme_block}>
                  <span>Country: {user.location}</span>
                  <span>Years old: {user.YO}</span>
                  <span>About me: {user.aboutMe}</span>
                </div>
              )}
            </div>
          </div>
          <div className={stylesProfile.buttons}>
            {friend ? (
              <div>
                <button onClick={friendDelete}>Delete from friends</button>
                <button>Send message</button>
              </div>
            ) : (
              <button onClick={friendAdd}>Add to friends</button>
            )}
          </div>
        </div>
        <div className={stylesProfile.photos_block}>photos here</div>
      </div>
    </>
  );
};

export default ProfileUser;
