import React from 'react';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../Redux/user/userSlice';
import { useAppDispatch} from '../Redux/store';
import FormLogin from './FormLogin';
import { signInUser } from '../firebase';
import { useAuth } from '../hooks/use-auth';
import stylesLogin from './Login.module.scss';
import { getDatabase, ref, get, child } from 'firebase/database';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuth } = useAuth();

  // Функция. Вызывается при нажатии, принимает в себя value инпутов из FormLogin.
  const handleLogin = async (email: string, password: string) => {
    // Инициализируем метод firebase который показывает базу данных.
    const db = getDatabase();
    const dbref = ref(db);
    if (!email || !password) {
      alert('Enter email or password');
      return;
    } else {
      try {
        // Асинхронная функция firebase которая логинит пользователя.
        let auth = await signInUser(email, password);
        const user = auth.user;
        // Асинхронная функция вызывающая базу данных users.
        // Диспатчит в store значения из базы данных.
        const request = await get(child(dbref, 'users/' + user.uid));
        if (request.exists()) {
          dispatch(
            setUser({
              name: request.val().username,
              location: request.val().location,
              photoURL: request.val().photoURL,
              status: request.val().status,
              old: request.val().YO,
              aboutMe: request.val().aboutMe,
              email: request.val().email,
              id: request.val().uid,
              token: request.val().refreshToken,
            }),
          );
        } else {
          console.error();
        }
        console.log(request.val())
        console.log(user)
        // Перевод на страницу profile.
        navigate('/profile');
      } catch (error) {
        console.error();
      }
    }
  };
  React.useEffect(() => {
    if (isAuth == true) {
      navigate('/profile');
    }
  }, [isAuth]);
  return (
    <div className={stylesLogin.login_page_Wrapper}>
      <h3>Welcome!</h3>
      <FormLogin title="sign in" handleClick={handleLogin} />
    </div>
  );
};

export default Login;
