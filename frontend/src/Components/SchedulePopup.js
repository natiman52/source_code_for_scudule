import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faClose } from '@fortawesome/free-solid-svg-icons'
export default function SchedulePopup(props) {
    var date = props.date.split('-')
    var [year,month,day] = date
    console.log(year,month,day)
  return (
      <div className='pop-up'>
        <p className='date-popup'>{`${day}/${month}/${year}`}</p>
        <div>
        <textarea className='work-popup' cols="45" rows="10" readOnly  value={props.work}/>
        </div>
        <FontAwesomeIcon onClick={props.closehandler} className='close-button' icon={faClose}/>
            <div className='crs-popup d-flex justify-content-between'>
        <p className='subject-popup'>{props.subject}</p>
        <p className='grade-popup'>Grade {props.grade_current}</p>
            </div>
    </div>
  )
}
