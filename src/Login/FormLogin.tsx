import React from 'react';
import stylesLogin from './Login.module.scss';
import { Link } from 'react-router-dom';

const FormLogin = ({ title, handleClick }) => {
  const [email, setEmail] = React.useState('');
  const [pass, setPass] = React.useState('');
  return (
    <div className={stylesLogin.login_block}>
      <h1>Sign in</h1>
      <div className={stylesLogin.input}>
        <span>Email</span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className={stylesLogin.input}>
        <span>Password</span>
        <input
          type="password"
          value={pass}
          onChange={(e) => {setPass(e.target.value)}}
        />
      </div>
      <button onClick={() => handleClick(email, pass)}>{title}</button>
      <div>
        <input type="checkbox"/>
        <span>remember me</span>
      </div>
      <div className={stylesLogin.link}>
        <span>No account?</span>
        <Link to="/register">Join us! </Link>
      </div>
    </div>
  );
};

export default FormLogin;
