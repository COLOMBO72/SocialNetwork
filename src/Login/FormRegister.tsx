import React from 'react';
import stylesLogin from './Login.module.scss';
import { Link } from 'react-router-dom';

const FormRegister = ({ handleClick }) => {
  const [email, setEmail] = React.useState('');
  const [pass, setPass] = React.useState('');
  const [name, setName] = React.useState('');
  const [locationUser, setLocationUser] = React.useState('');
  const [old, setOld] = React.useState('');
  return (
    <div className={stylesLogin.login_block}>
      <h1>Register your account</h1>
      <div className={stylesLogin.input}>
        <span>Email</span>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className={stylesLogin.input}>
        <span>Password</span>
        <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} />
      </div>
      <div className={stylesLogin.input}>
        <span>Name</span>
        <input type="name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className={stylesLogin.input}>
        <span>Location</span>
        <input
          type="location"
          value={locationUser}
          onChange={(e) => setLocationUser(e.target.value)}
        />
      </div>
      <div className={stylesLogin.input}>
        <span>Years old</span>
        <input type="old" value={old} onChange={(e) => setOld(e.target.value)} />
      </div>
      <div>
        <input type="file" id={"file"} />
        <label htmlFor="file"><img src='./assets/icon-fileload.png'/></label>
      </div>
      <button onClick={() => handleClick(email, pass, name, locationUser, old)}>Sign Up</button>
      <div className={stylesLogin.link}>
        <span>Already have account?</span>
        <Link to="/login">Sign in! </Link>
      </div>
    </div>
  );
};

export default FormRegister;
