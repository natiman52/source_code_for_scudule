import {useState} from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import "./Navbar.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faBars} from "@fortawesome/free-solid-svg-icons"
import Login from './Login'
import {NavLink} from "react-router-dom"
export  const Navbar = (props) => {
    const [toggleState, setTogglestate] = useState(true)
    const [showSignUp,setShowSignUp] =useState(false)
    const holdvar =window.localStorage.getItem("profile")
    var toggleStyle = toggleState ? {"display":  "none"} :{"display":  "block"}
    function diplaySignUp(e){
        setShowSignUp(prevData => true) 
    }
    function closeSignUp(e){
        setShowSignUp(prevData => false)
    }
  return (
    <div className='nav'>
    <nav style={{"width":"100%"}}>
        {showSignUp && <Login allgrade={props.allgrade} get_cookie={props.get_cookie} originurl={props.originurl} hide={closeSignUp}/>}
<div className='d-flex justify-content-between align-items-center flex-wrap'>
        <div className='logo-container'>
                <div className='title-holder pc-display-none'>
            <div className='navbar-element-1' ><span className='drop-menu-icon drop-me' onClick={props.opennav}><FontAwesomeIcon icon={faBars} /></span><p className='abgs'>ABGS</p> <p className='SCH'>SchedulePrgoram </p></div>
                </div>
                <div className='title-holder ph-display-none'>
            <div className='navbar-element-1' ><p className='abgs'>ABGS</p> <p className='SCH'> SchedulePrgoram</p></div>
                </div>
        </div>
    <div className='ph-display-none'>
        <div className='d-flex justify-content-center align-items-center'>
            <div className='profile-display'>

            </div>
        {
            props.User ?
            <>
            <NavLink className="profile-link"  to="/profile">{holdvar ? JSON.parse(window.localStorage.getItem("profile")).username : " " }</NavLink>
            <p onClick={props.createshow } className="navbar-create-pc" >Create</p>
            {props.isstaff && <p onClick={diplaySignUp} className="navbar-signup-pc">SignUp</p>}
            <p onClick={props.logout} className="navbar-logout-pc">LogOut</p>
            </>
            :<p onClick={props.loginShow} className="navbar-create-pc" >Log In</p>
        }
        </div>
    </div>
    <div className=' navbar-toggler pc-display-none'>
        <button className='btn toggle-btn' onClick={e => { setTogglestate(prevData => !prevData )  } }><FontAwesomeIcon icon={faBars}/></button>
    </div>
</div>
        <div className='toggled pc-display-none' style={toggleStyle} >
        {
            props.User ?
            <>
            <NavLink className="profile-link"  to="/profile">{holdvar ? JSON.parse(window.localStorage.getItem("profile")).username : " " }</NavLink>
            <p onClick={props.createshow } className="navbar-create-ph" >Create</p>
            {props.isstaff && <p onClick={diplaySignUp} className="navbar-create-ph">SignUp</p>}
            <p onClick={props.logout} className="navbar-logout-ph">LogOut</p>
            </>
            :<p onClick={props.loginShow} className="navbar-create-ph" >Log In</p>
        }
        </div>
    </nav>
    </div>
      )
}
