import React from 'react'
import stylesUsers from './Users.module.scss';

const UserBlock = ({username,location,photoURL}) => {
  return (
    <div>
      {username}
    </div>
  )
}

export default UserBlock
