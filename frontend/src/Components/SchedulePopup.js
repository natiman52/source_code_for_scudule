import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faClose } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
export default function SchedulePopup(props) {
  const [ShowDeleteConfrmation,setShowDeleteConfrmation]=React.useState(false)
  const [EditForm,setEditForm] = React.useState(false)
  const [Grade,setGrade]= React.useState(props.grade_current)
  const [Message,setMessage]= React.useState(props.work)
    var date = props.date.split('-')
    var [year,month,day] = date
  function editEventHandler(e){
    setEditForm(e => true)
  }
  async function deleteEventHandler(e){
    const csrftoken =props.getcookie("csrftoken")
    await axios.delete(`${process.env.REACT_APP_ORIGIN_URL}api/${props.pk}/delete`, {headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFToken': csrftoken
    }}).then( res =>{
      props.closehandler()
      props.getschedule(e)
    })
  }
  async function subjectHandler(e){
    const csrftoken = props.getcookie("csrftoken")
      await axios.put(`${process.env.REACT_APP_ORIGIN_URL}api/${props.pk}/update`,{work:Message,grade:Grade},{headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken
      }}).then(res => {
        setEditForm(e => false)
        props.getschedule(e)
        setGrade(prev => "9A")
      })
  }
  function workHandler(e){
    setMessage(prev => e.target.value)
  }
  function gradeHandler(e){
    setGrade(prev => e.target.value)

  }
  return (
    <div className='full-screen'>
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
            <textarea className='work-popup' readOnly  value={Message}/>
        <div className='crs-popup d-flex justify-content-between'>
          <p className='subject-popup'>{props.subject}</p>
          <p className='grade-popup'>Grade {Grade}</p>
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
      <label htmlFor="grade_field">Grade</label>
      <select className='test123' id='grade_field' onChange={gradeHandler} defaultValue={props.grade_current}>
        {
          props.allgrade.map(e => {
            return <option  value={e}>{e}</option>
          })
        }
      </select>
      <label htmlFor='message-field'>Schedule</label>
      <textarea onChange={workHandler} id="message-field" className='edit-work-input' defaultValue={Message} />
      <button onClick={subjectHandler} self_value={props.subject} self_value_grade={Grade}>submit</button>
      </>
}
      </div>
      </div>
      </div>
  )
}
