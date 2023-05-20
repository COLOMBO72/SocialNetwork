import React from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import Preloader from '../Loading/Preloader';
import Search from '../UsersList/Search';
import { UserBlockMessages } from './UserBlockMessages';
import stylesMessages from './Dialogs.module.scss'

const Navbar = React.memo(() => {
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    setLoading(true);
    const fetchUsers = async () => {
      const array = [];
      const querySnapshot = await getDocs(collection(db, 'users'));
      querySnapshot.forEach((item) => {
        array.push(item.data());
      });
      setUsers(array);
      setLoading(false);
    };
    fetchUsers();
  }, []);
  if (loading) {
    return <Preloader />;
  }
  return (
    <div className={stylesMessages.usersList_wrapper}>
      <Search />
      <div>
        {users.map((s, i) => {
          return <UserBlockMessages key={i} {...s} />;
        })}
      </div>
    </div>
  );
});
export default Navbar;
