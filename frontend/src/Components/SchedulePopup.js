import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faClose } from '@fortawesome/free-solid-svg-icons'
export default function SchedulePopup(props) {
  const [ShowDeleteConfrmation,setShowDeleteConfrmation]=React.useState(false)
  const [EditForm,setEditForm] = React.useState(false)
    var date = props.date.split('-')
    var [year,month,day] = date
  function editEventHandler(e){
    setEditForm(e => true)
  }
  function deleteEventHandler(e){
    return true
  }
  return (
    <div className="absoulute-one">
      <div style={{display:"grid"}} className='rel-1'>
        {!EditForm
        ?<>
  <div style={{transition:"all 0.6s ease",display:"grid"}} className={ShowDeleteConfrmation ? "show-delete-conf" : "hide-delete-conf"}>
        <FontAwesomeIcon onClick={e => setShowDeleteConfrmation(() => false)} className='close-button-test' icon={faClose}/>
        Are you sure you want to delete this schedule. if so click delete below
        <br/><button style={{justifySelf:"end"}} onClick={deleteEventHandler} className='delete-button'>Delete</button>
        
        </div>
          <FontAwesomeIcon onClick={props.closehandler} className='close-button-test' icon={faClose}/>
          <p className='date-popup'>{`${day}/${month}/${year}`}</p>
            <textarea className='work-popup' readOnly  value={props.work}/>
        <div className='crs-popup d-flex justify-content-between'>
          <p className='subject-popup'>{props.subject}</p>
          <p className='grade-popup'>Grade {props.grade_current}</p>
        </div>
        {
          props.profile.pk ===props.owner ?
        <div className='edit-delete-container'>
          <button onClick={editEventHandler} className='edit-button'>Edit</button>
          <button onClick={e => setShowDeleteConfrmation( () => true )} className='delete-button'>Delete</button>
        </div>
        : ""
      }
      </>:
      <>
      <FontAwesomeIcon onClick={props.closehandler} className='close-button-test' icon={faClose}/>
      <select>
        {
          props.allgrade.map(e => {
            return <option value={e}>e</option>
          })
        }
      </select>

      </>
}
      </div>
      </div>
  )
}
