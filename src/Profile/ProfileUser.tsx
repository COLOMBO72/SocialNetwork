import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../Redux/store';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../hooks/use-auth';
import stylesProfile from './Profile.module.scss';
import Preloader from '../Loading/Preloader';

// type User = {
//   photoURL: string;
//   location: string;
//   username: string;
//   status: string;
//   YO: string;
//   aboutMe: string;
// };

const ProfileUser: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
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
        return console.log('no doc');
      }
      setLoading(false);
    };
    docSnap();
  }, []);
  if (loading) {
    return <Preloader />;
  }

  return (
    <>
      <div className={stylesProfile.profile_wrapper}>
        <div className={stylesProfile.profile_block}>
          <div className={stylesProfile.ava_wrapper}>
            <img src={user.photoURL ? user.photoURL : '/assets/null_ava.jpg'} />
          </div>
          <div className={stylesProfile.profile_info_block}>
            <div className={stylesProfile.namewrap}>
              <span>{user.username}</span>
            </div>
            <span>{user.status}</span>
            <span> {user.location}</span>
            <span>{user.YO}</span>
          </div>
          <div className={stylesProfile.aboutme_block}>
            <div className={stylesProfile.aboutme_wrap}>
              <span>About me</span>
            </div>
            <span>{user.aboutMe}</span>
            <span>My interests in coding</span>
          </div>
          <div className={stylesProfile.buttons}>
            <button>Add to friends</button>
            <button>Delete from friends</button>
            <button>Send message</button>
          </div>
        </div>
        <div className={stylesProfile.photos_block}>
          <img src="/assets/zuckerberg.jpg" width={150} height={150} />
          <img src="/assets/durov.jpeg" width={150} height={150} />
        </div>
      </div>
    </>
  );
};

export default ProfileUser;
