import axios from 'axios'
import React,{useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'

export default function CreateSchedule(props) {
  const token =localStorage.getItem("file_name")
    const [Work,setWork] = useState()
    const [Grade,setGrade] = useState("9A")
    const TextAreaHandler = e =>{
            setWork(() => e.target.value )
    }
    const gradeHandler = e =>{
      setGrade( () => e.target.value )
    }
    const CreateForm = async (e) =>{
      var csrftoken =props.get_cookie("csrftoken")
        const self_header = {
          'Authorization': `token ${token}`,
          'X-CSRFToken': csrftoken
        }
        await axios.post(`${props.originurl}api/create_schedule/`,{ 'grade':Grade,"subject":JSON.parse(window.localStorage.getItem("profile")).profile.subject,"work":Work},{headers:self_header}).then( res =>{
          props.hideme()
          props.getschedule(e)
        })
    }
  return (
    <div className='full-screen'>
    <div className='create-pop-up absoulute-one'>
        <FontAwesomeIcon onClick={props.hideme} className="close-button" icon={faClose}/>
        <div className='form-container'>
          <p className='create-icon'> Create Schedule</p>
                <div className='single-form'>
                      <select onChange={gradeHandler}>
                      {props.allgrade.map( e =>{
                        return <option  value={e}>{e}</option>
                      })}
                      </select>

                </div>
                <div className='single-form'>
                <p></p>
                <textarea onChange={TextAreaHandler} className="work-input" rows="7" />
                </div>
                      <button onClick={CreateForm} className="submit-schedule">Submit</button>
        </div>
    </div>
    </div>
  )
}
