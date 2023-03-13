import {useState} from 'react'
import Topbar from './Topbar'
import SchedulePopup from '../SchedulePopup'

export default function Mainbar(props) {
  const [PoPup, setPoPup]= useState([])
  function ShowSchedule(event,grade,work,subject,date){
    setPoPup(()=><SchedulePopup closehandler={HideSchedule} grade_current={grade} work={work} subject={subject} date={date} />)
  }
function HideSchedule(){
    setPoPup( prevData => '' )
  }

  return (
    <div>
<Topbar activegrade={props.activegrade} activesubject={props.activesubject} wholesubject={props.wholesubject} allgrade={props.allgrade} clickHandler={props.scheduleretriever}/>
  {PoPup} 
    <div className='container background-dcit1 mt-2'>
      {props.schedule.map( (e,key) =>{
                return (
                  <>
        <div key={key} onClick={ myevent => ShowSchedule(myevent,e.grade,e.work,e.subject,e.date ) } className='schedule-parent'>
                  <div className='single-schedule'>
                    <div className='d-flex justify-content-between n-mr-0'>
                      <div>
                    <p>Grade {e.grade}</p> 
                      </div>
                      <div>
                    <p>{e.subject}</p>
                      </div>
                    </div>
                  <p className='schedule-work'>{e.work}</p>
                  <p className='schedule-date'>{e.date}</p>
                  </div>
        </div>
        </>
       )
      })}
    </div>
</div>
  )
}
