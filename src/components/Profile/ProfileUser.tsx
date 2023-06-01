import React from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import stylesProfile from './Profile.module.scss';
import Preloader from '../Loading/Preloader';
import NotFound from '../NotFound/NotFound';

const ProfileUser: React.FC = () => {
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
    //@ts-ignore
  }>({});
  const URL = useParams();

  React.useEffect(() => {
    const docSnap = async () => {
      setLoading(true);
      const snap = await getDoc(doc(db, 'users', URL.uid));
      if (snap.exists()) {
        //@ts-ignore
        setUser(snap.data());
      } else {
        console.error();
        setLoading(false);
      }
      setLoading(false);
    };
    docSnap();
  }, []);
  console.log(user);

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
            <button>Add to friends</button>
            <button>Delete from friends</button>
            <button>Send message</button>
          </div>
        </div>
        <div className={stylesProfile.photos_block}>photos here</div>
      </div>
    </>
  );
};

export default ProfileUser;
