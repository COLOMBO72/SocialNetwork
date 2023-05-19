import { createUser, db, signInUser } from '../firebase';
import '../firebase';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useAppDispatch } from '../Redux/store';
import { signIn } from '../Redux/user/userSlice';

export const RegisterFunction = async (
  email: string,
  password: string,
  name: string,
  locationUser: string,
  old: string,
) => {
  const auth = getAuth();
  const usersRef = collection(db, 'users');
  // Вызывает две асинхронные функции:
  try {
    // 1: создаёт пользователя и записывает данные в firebase authefication.
    await createUser(email, password);
    // 2: создаёт функцию в которой есть асинхронный запрос на сервер для отправления введённых данных.
    const writeUserData = async (old: string, name: string, locationUser: string) => {
      // Отправка введённых данных.
      await setDoc(doc(usersRef, `${auth.currentUser.uid}`), {
        uid: auth.currentUser.uid,
        username: name,
        email: auth.currentUser.email,
        location: locationUser,
        aboutMe: 'Hello its my info',
        photoURL: 'https://i.pinimg.com/170x/e1/d7/94/e1d794ffcee3f85ee53d4a4b47899a55.jpg',
        status: 'Just react developer',
        YO: old,
        token: auth.currentUser.refreshToken,
      });
    };
    // Вызывается функция в функции (замыкание).
    writeUserData(old, name, locationUser);
  } catch (error) {
    console.error();
  }
};
