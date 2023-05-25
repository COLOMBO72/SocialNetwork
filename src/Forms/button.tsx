import React from 'react'
import stylesButton from './button.module.scss'

const ButtonForm = ({CallFunction, title}) => {
  return (
    <>
      <button className={stylesButton.button} onClick={()=>CallFunction()}>{title}</button>
    </>
  )
}

export default ButtonForm
