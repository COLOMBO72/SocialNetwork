import React from 'react';
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Register from './Login/Register';
import Login from './Login/Login';
import Profile from './Profile/Profile';
import Users from './UsersList/Users';
import Messages from './Messages/Dialogs';
import Header from './Header/Header';
import { useAuth } from './hooks/use-auth';
import ProfileUser from './Profile/ProfileUser';
import NotFound from './NotFound/NotFound';
import EditProfile from './Profile/EditProfile';

const App = () => {
  const { isAuth } = useAuth();
  return (
    <div className="app_wrapper">
      <main className="main">
        {isAuth ? <Header /> : ''}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Profile />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:uid" element={<ProfileUser />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
