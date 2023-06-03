import React from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import stylesUsers from './Users.module.scss';
import UserBlock from './UserBlock';
import { useAppSelector } from '../../Redux/store';
import { selectUser } from '../../Redux/user/userSlice';
import Preloader from '../Loading/Preloader';
import Search from '../Forms/Search';

const Users = React.memo(() => {
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
    <div className={stylesUsers.usersList_wrapper}>
      <span>Users list</span>
      <Search />
      <div>
        {users.map((user, i) => {
          return <UserBlock key={i} {...user} />;
        })}
      </div>
    </div>
  );
});

export default Users;
