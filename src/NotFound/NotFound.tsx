import React from 'react';
import './NotFound.scss';
import error_icon from '../assets/error-icon.png';

const NotFound = () => {
  return (
    <div className='wrapper_not_found'>
      <img src={error_icon} alt="Error: page not found" />
      <h3>Oops, page not found!</h3>
    </div>
  )
}

export default NotFound
