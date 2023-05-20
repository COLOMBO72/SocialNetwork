import React from 'react';
import stylesUsers from './Users.module.scss';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import debounce from 'lodash.debounce';

export const Search: React.FC = () => {
  const [username, setUsername] = React.useState('');
  const [user, setUser] = React.useState(null);
  const inputRef = React.useRef(null);

  const onSearchUpdate = React.useCallback(
    debounce((username: string) => {
      const q = query(collection(db, 'users'), where('username', '==', username));
      try {
        getDocs(q).then((doc) =>
          doc.forEach((elem) => {
            setUser(elem.data());
            console.log(elem.data());
          }),
        );
      } catch (error) {
        console.error();
      }
    }, 1000),
    [],
  );
  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
    onSearchUpdate(event.target.value);
  };
  const onClickClose = () => {
    setUsername('');
    setUser(null);
    inputRef.current?.focus(); //focus after clear
  };
  // React.useEffect(() => {
  //   const onClick = e => root.current.contains(e.target);
  //   document.addEventListener('click', onClick);
  //   return () => document.removeEventListener('click', onClick);
  // }, []);

  return (
    <div className={stylesUsers.search_wrapper}>
      <div className={stylesUsers.search_input}>
        <img className={stylesUsers.icon_search} src="./assets/icon-search.png" />
        <input
          type="text"
          placeholder="Find user"
          className={stylesUsers.search_input}
          onChange={onSearch}
          value={username}
          ref={inputRef}
        />
        {username ? (
          <img
            className={stylesUsers.icon_close}
            src="./assets/icon-close.png"
            onClick={onClickClose}/>) : ('')}
      </div>
      <div>
        {user && (
          <div className={stylesUsers.finded_user}>
            <img src={user.photoURL} width={30} />
            <div>
            <span>{user.username}</span>
            <span>{user.location}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
