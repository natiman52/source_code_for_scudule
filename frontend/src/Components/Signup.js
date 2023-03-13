import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faClose } from '@fortawesome/free-solid-svg-icons'
export default function Signup(props) {
  const [Username,setUsername] = React.useState('')
  const [Password,setPassword] = React.useState('')
  const UserHandler = e =>{
    setUsername( () => e.target.value )
  }
  const PassHandler = e => {
    setPassword(() => e.target.value )
  }
  return (
    <div className='absoulute-one'>
        <div className='rel-1'>
        <p className='sign-up-logo'> Log In</p>
        <span>Username: <input type="text" onChange={ UserHandler } placeholder='Username'/></span>
        <span>Password: <input type="Password" onChange={PassHandler } placeholder='Password'/></span>
        <button onClick={e => props.AuthLog(e, Username,Password ) } className='signup-button'> Log In </button> 
        <FontAwesomeIcon onClick={props.loginHide} className='close-button' icon={faClose}/>
        </div>
    </div>
  )
}
