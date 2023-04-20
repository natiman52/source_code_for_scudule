import React, {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import axios from "axios"
export default function Login(props){
    const [Password,setPassword] = useState()
    const [Correct,SetCorrect] = useState()
    const [Errortext,setErrortext] =useState()
    const [Username,setUsername] = useState()
    const [UsernameTaken,setUsernameTaken ] = useState()
    const [Confirmed, setConfirmed] = useState()
    const[Errortext2,setErrortext2] =useState()
    const[Subject,setSubject]=useState('Maths')
    function handleSelect(e){
        setSubject(prev => e.target.value)
    }
    function handleUsername(e){
        setUsername(prevData => e.target.value)
    }
    function handlePassword(e){
        setPassword(prevData => e.target.value)
        console.log( "")
        if(e.target.value.length > 8){
            if(/[A-Z]/.test(e.target.value) && /\d/.test(e.target.value)){
                SetCorrect(e => 1)
            }
        }else{
            SetCorrect( () => 0)
        }
    }
    function handleConfirmPassword(e){
        if(Password === e.target.value){
            setConfirmed(() => true)
        }else{
            setConfirmed(() => false)
        }
    }
    async function SignUp(){
        if(Correct === 0){
            setErrortext(() => <>Please choose another password</>)
        }else if(Correct === 1){
            setErrortext(() => <></>)
        }
        if(!Confirmed){
            setErrortext2(() => <>The passwords didn't match</>)
        }else if(Confirmed){
            setErrortext2(() => <></>)
        }
        if((Password  && Username) && (Correct === 1 && Confirmed) ){
            var csrftoken =props.get_cookie("csrftoken")
            await axios.post(`${props.originurl}api/create_user/`,{username:Username,password:Password,subject:Subject},{headers:{
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
        <div className='rel-1 signup-class'>
        <FontAwesomeIcon onClick={props.hide} className='close-button-test' icon={faClose}/>
        <p className='sign-up-logo'> SignUp</p>
        <div className="username-form">
        <p>Username</p>
        <input type="text" onChange={handleUsername}  placeholder='Username'/>
        <div>
        <p className="error-tag">{UsernameTaken && <>please change username</> }</p>    
        </div>
        </div>
        <div onChange={handleSelect} defaultValue="Maths" className="select-form">
            <p>Grade</p>
            <select>
                {
                    props.allgrade.map(e => {
                        return <option value={e}>{e}</option>
                    })
                }
            </select>
        </div>
        <div className="password">
        <p>Password</p>
        <input style={Correct === 1 ? {outlineColor:"green"} : Correct === 0 ? {outlineColor:"red"} : {} } type="Password" onChange={handlePassword}  placeholder='Password'/>
        <p className="error-tag">{Errortext}</p>    
        <ul className="signup-helptext">
            <li>Password must be longer than 8 letters.</li>
            <li>It must contain both numbers and letters.</li>
            <li>You must add at least one uppercase letter</li>
        </ul>
        <p>Confirm password</p>
        <input style={Confirmed ? {outlineColor:"green"}: {outlineColor:"red"}} type="password" onChange={handleConfirmPassword}/>
        <p className="error-tag">{Errortext2}</p>    
        </div>
        <button className='signup-button' onClick={SignUp}> SignUp </button> 
        </div>
    </div>
        </>
    )

}