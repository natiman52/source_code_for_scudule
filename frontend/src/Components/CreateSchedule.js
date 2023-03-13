import axios from 'axios'
import React,{useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'

export default function CreateSchedule(props) {
  const token =localStorage.getItem("file_name")
    const [Work,setWork] = useState()
    const[Subject,setSubject] =useState("Maths")
    const [Grade,setGrade] = useState("9")
    const TextAreaHandler = e =>{
            setWork(() => e.target.value )
    }
    const subjectHandler = e =>{
      setSubject(() => e.target.value)
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
        console.log(token)
        await axios.post(`${props.originurl}api/create_schedule/`,{ 'grade':Grade,"subject":Subject,"work":Work},{headers:self_header}).then( e =>{
          props.hideme()
        })
    }
  return (
    <div className='create-pop-up absoulute-one'>
        <FontAwesomeIcon onClick={props.hideme} className="close-button" icon={faClose}/>
        <div className='form-container'>
          <p className='create-icon'> Create Schedule</p>
                <div className='single-form'>
                    <p></p>
                    <select onChange={subjectHandler}>
                      {props.wholesubject.map( e =>{
                        return e === "All"?  "" : <option value={e}>{ e }</option>
                      })}
                    </select>
                </div>
                <div className='single-form'>
                <p></p>
                <textarea onChange={TextAreaHandler} className="work-input" rows="7" />
                </div>
                <div className='single-form'>
                      <select onChange={gradeHandler}>
                      {props.allgrade.map( e =>{
                        return <option  value={e}>{e}</option>
                      })}
                      </select>

                </div>
                      <button onClick={CreateForm} className="submit-schedule">Submit</button>
        </div>
    </div>
  )
}
