import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import "./BarComponents/profile.css"
import axios from 'axios'
import { Link } from 'react-router-dom'
function Profile() {
  const [Schedule,setSchedule]=React.useState([])
    const [Profile,setProfile] = React.useState(JSON.parse(window.localStorage.getItem("profile")))
    console.log(Profile.username)
    React.useEffect( () => {
      async function myApiCall(){
        await axios(`${process.env.REACT_APP_ORIGIN_URL}api/${Profile.pk}/schedule_user`).then(
          res => { 
            setSchedule(prevdata => res.data)
          }
        )
      }
      myApiCall()
    },[Profile])
  return (
    <div style={{"backgroundColor":"#f6f9ff"}}>
    <nav className='nav'>
    <div className='d-flex justify-content-between align-items-center flex-wrap'>
        <div className='logo-container'>
                <div className='title-holder pc-display-none'>
            <div className='navbar-element-1' ><span className='drop-menu-icon drop-me'><FontAwesomeIcon icon={faBars} /></span><p className='abgs'>ABGS</p> <p className='SCH'>SchedulePrgoram </p></div>
                </div>
                <div className='title-holder ph-display-none'>
            <div className='navbar-element-1' ><p className='abgs'>ABGS</p> <p className='SCH'> SchedulePrgoram</p></div>
                </div>
        </div>
    </div>
    </nav>
<div className='navigation-test'>
    <p><Link to="/"> Home</Link> <FontAwesomeIcon icon={faChevronRight}/> </p>
    <p>Schedule <FontAwesomeIcon icon={faChevronRight}/> </p>
    <p>Profile</p>
</div>
<div>
  <div className='row'>
<div className='offset-1 col-3 profile-card'>
<p>Username:</p>
<span>{Profile.username}</span>
<p>Subject:</p>
<span>{Profile.profile.subject}</span>
</div>
<div className='offset-1 col-6 profile-overview'>
<p>Schedules</p>
{
  Schedule.map( e => {
    var number = Schedule.indexOf(e) + 1
    return (
      <div className='schedule-list'>
        <span>{number}</span>
        <span>{e.work}</span>
        <span>{e.date}</span>
      </div>
    )
})
}
</div>
  </div>
</div>
    </div>

  )
}

export default Profile