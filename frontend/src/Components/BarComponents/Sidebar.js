import React from 'react'

export default function Sidebar(props) {
  console.log(props.wholesubject)
  return (
    <div className='subject-container ph-display-none'>
        {props.wholesubject.map((e,key) => {
            return <p key={key} onClick={props.clickHandler} className={ `subject-holder ${props.currentsubject === e ? "active" : "" }`} field_type="subject"  self_value={e} > {e} </p>
        })}
    </div>
  )
}
