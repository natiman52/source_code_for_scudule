import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faClose } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
const OriginUrl =process.env.REACT_APP_ORIGIN_URL
export default function Signup(props) {
  const [Username,setUsername] = React.useState('')
  const [Password,setPassword] = React.useState('')
  const [SerError,setSerError] =React.useState(false)
  const UserHandler = e =>{
    setUsername( () => e.target.value )
  }
  async function getAuthToken(event,username,password){
    var csrftoken =props.getCookie("csrftoken")
      await axios.post(`${OriginUrl}api/auth_ver/`,{username:username,password:password},{headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken
      }}).then( e => {
      window.localStorage.setItem("file_name",e.data.token)
      props.setAuthUser( () => true )
      props.setShowLoginForm(prevData => false )
      setSerError(e => false )
    }).catch( e => {
      setSerError(e => true)
    })
  }
  const PassHandler = e => {
    setPassword(() => e.target.value )
  }
  return (
    <div className='absoulute-one'>
          <div className='error-class'>{SerError&&<p>Sorry the given username or password is wrong</p>}</div>
        <div className='rel-1 login-class'>
        <FontAwesomeIcon onClick={props.loginHide} className='close-button-test' icon={faClose}/>
        <p className='sign-up-logo'> Log In</p>
        <span>Username: <input type="text" onChange={ UserHandler } placeholder='Username'/></span>
        <span>Password: <input type="Password" onChange={PassHandler } placeholder='Password'/></span>
        <button onClick={e => getAuthToken(e, Username,Password ) } className='signup-button'> Log In </button> 
        </div>
    </div>
  )
}
