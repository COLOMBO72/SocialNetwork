import React from 'react';
import { useNavigate } from 'react-router-dom';
import stylesLogin from './Login.module.scss';
import '../../firebase';
import { Link } from 'react-router-dom';
import Preloader from '../Loading/Preloader';
import icon_file from '../assets/icon-fileload.png';
import { onHandleRegister } from '../../api';

const Register: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const email = e.target[0].value;
    const pass = e.target[1].value;
    const name = e.target[2].value;
    const locationUser = e.target[3].value;
    const old = e.target[4].value;
    const file = e.target[5].files[0];
    onHandleRegister(pass, name, file, email, locationUser, old, navigate, setLoading);
    setLoading(false);
  };
  if (loading) {
    <Preloader />;
  }
  return (
    <div className={stylesLogin.login_page_Wrapper}>
      <h3>Join Us!</h3>
      <form onSubmit={handleSubmit} className={stylesLogin.login_block}>
        <h1>Register your account</h1>
        <div className={stylesLogin.input}>
          <span>Email</span>
          <input type="email" />
        </div>
        <div className={stylesLogin.input}>
          <span>Password</span>
          <input type="password" />
        </div>
        <div className={stylesLogin.input}>
          <span>Name</span>
          <input type="name" />
        </div>
        <div className={stylesLogin.input}>
          <span>Location</span>
          <input type="location" />
        </div>
        <div className={stylesLogin.input}>
          <span>Years old</span>
          <input type="old" />
        </div>
        <div className={stylesLogin.choseImage}>
          <span>Load your photo</span>
          <input style={{ display: 'none' }} type="file" id={'file'} />
          <label htmlFor="file">
            <img src={icon_file} />
          </label>
        </div>
        <button>Sign Up</button>
        <div className={stylesLogin.link}>
          <span>Already have account?</span>
          <Link to="/login">Sign in! </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
