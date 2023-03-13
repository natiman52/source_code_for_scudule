import React, {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import axios from "axios"
export default function Login(props){
    const [Password,setPassword] = useState()
    const [Username,setUsername] = useState()
    const [ UsernameTaken,setUsernameTaken ] = useState()
    function handleUsername(e){
        setUsername(prevData => e.target.value)
    }
    function handlePassword(e){
        setPassword(prevData => e.target.value)
    }
    async function SignUp(){
        if(Password  && Username ){
            var csrftoken =props.get_cookie("csrftoken")
            const apiCall = await axios.post(`${props.originurl}api/create_user/`,{username:Username,password:Password},{headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
              }}).then(e =>{
                console.log(e.data)
                if(e.data === "username Taken"){
                    setUsernameTaken(prevData => true)
                    console.log(UsernameTaken)
                }else{
                    props.hide()
                }
            })
        }
    }
    return (
        <>
    <div className='absoulute-one'>
        <div className='rel-2'>
        <p className='sign-up-logo'> SignUp</p>
        <span>
        <div>Username:<input type="text" onChange={handleUsername}  placeholder='Username'/></div>
        <div>
        <p className="error-tag">{UsernameTaken && <>please change username</> }</p>    
        </div>
        </span>
        <span>Password: <input type="Password" onChange={handlePassword}  placeholder='Password'/></span>
        <button className='signup-button' onClick={SignUp}> SignUp </button> 
        <FontAwesomeIcon onClick={props.hide} className='close-button' icon={faClose}/>
        </div>
    </div>
        </>
    )

}