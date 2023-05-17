import React from 'react';
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Register from './Login/Register';
import Login from './Login/Login';
import Profile from './Profile/Profile';

const App = () => {
  return (
    <main className='main'>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Profile />} />
      </Routes>
    </main>
  );
};

export default App;
