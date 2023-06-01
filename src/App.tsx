import React from 'react';
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Register from './components/Login/Register';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import Users from './components/UsersList/Users';
import Messages from './components/Messages/Dialogs';
import Header from './components/Header/Header';
import { useAuth } from './components/hooks/use-auth';
import ProfileUser from './components/Profile/ProfileUser';
import NotFound from './components/NotFound/NotFound';
import EditProfile from './components/Profile/EditProfile';

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
