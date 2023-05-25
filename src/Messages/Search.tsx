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
import { db } from '../firebase';
import debounce from 'lodash.debounce';
import { useAppSelector } from '../Redux/store';
import { selectUser } from '../Redux/user/userSlice';
import Preloader from '../Loading/Preloader';

export const Search: React.FC = () => {
  const [username, setUsername] = React.useState('');
  const [user, setUser] = React.useState(null);
  const inputRef = React.useRef(null);
  const currentUser = useAppSelector(selectUser);
  const [loading, setLoading] = React.useState(false);

  const handleSelect = async () => {
    setLoading(true);
    // Проверяет есть ли диалог в firestore, если нет - то создаёт
    const combinedId =
      currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, 'dialogs', combinedId));
      if (!res.exists()) {
        // Создаёт коллекцию в dialogs
        await setDoc(doc(db, 'dialogs', combinedId), { messages: [] });

        await updateDoc(doc(db, 'userDialogs', currentUser.uid), {
          [combinedId + '.userInfo']: {
            uid: user.uid,
            username: user.username,
            photoURL: user.photoURL,
          },
          [combinedId + '.date']: serverTimestamp(),
        });
        await updateDoc(doc(db, 'userDialogs', user.uid), {
          [combinedId + '.userInfo']: {
            uid: currentUser.uid,
            username: currentUser.username,
            photoURL: currentUser.photoURL,
          },
          [combinedId + '.date']: serverTimestamp(),
        });
      }
    } catch (error) {
      console.error();
      setLoading(false);
    }
    setUser(null);
    setUsername('');
    setLoading(false);
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
  if (loading){
    return <Preloader/>
  }
  return (
    <div className={stylesSearch.search_wrapper}>
      <div className={stylesSearch.search_input}>
        <img className={stylesSearch.icon_search} src="./assets/icon-search.png" />
        <input
          type="text"
          placeholder="Find user"
          className={stylesSearch.search_input}
          onChange={onSearch}
          value={username}
          ref={inputRef}
        />
        {username ? (
          <img
            className={stylesSearch.icon_close}
            src="./assets/icon-close.png"
            onClick={onClickClose}
          />
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
