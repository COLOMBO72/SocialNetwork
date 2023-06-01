import React from 'react';
import stylesSearch from '../Forms/Search.module.scss';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../../firebase';
import debounce from 'lodash.debounce';
import { useAppSelector } from '../../Redux/store';
import { selectUser } from '../../Redux/user/userSlice';
import Preloader from '../Loading/Preloader';
import icon_search from '../assets/icon-search.png';
import icon_close from '../assets/icon-close.png';
import { handleSelectSearch } from '../../api';

const Search: React.FC = () => {
  const [username, setUsername] = React.useState('');
  const [user, setUser] = React.useState(null);
  const inputRef = React.useRef(null);
  const currentUser = useAppSelector(selectUser);
  const [loading, setLoading] = React.useState(false);

  const handleSelect = async () => {
    handleSelectSearch(setLoading, user, currentUser, setUser, setUsername);
  };

  const onSearchUpdate = React.useCallback(
    debounce((username: string) => {
      setLoading(true);
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
      setLoading(false);
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
  if (loading) {
    return <Preloader />;
  }
  return (
    <div className={stylesSearch.search_wrapper}>
      <div className={stylesSearch.search_input}>
        <img className={stylesSearch.icon_search} src={icon_search} />
        <input
          type="text"
          placeholder="Find user"
          className={stylesSearch.search_input}
          onChange={onSearch}
          value={username}
          ref={inputRef}
        />
        {username ? (
          <img className={stylesSearch.icon_close} src={icon_close} onClick={onClickClose} />
        ) : (
          ''
        )}
      </div>
      <div>
        {user ? (
          <div className={stylesSearch.finded_user}>
            <img src={user.photoURL} onClick={handleSelect} width={30} />
            <div>
              <span>{user.username}</span>
              <span>{user.location}</span>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default Search;
