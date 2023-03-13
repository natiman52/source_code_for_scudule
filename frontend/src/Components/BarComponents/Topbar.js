

export default function Topbar(props) {
  console.log(props.wholesubject)
  return (
  <div>
    <div className='d-flex align-items-center'>
      <div className='ph-display-none'>
        <div className='grade-container '>
          {props.allgrade.map( e => {
             return <p onClick={props.clickHandler} field_type="grade"  self_value_grade={e} className={`grade-holder ${props.activegrade === e ? "active-grade": "" }`}>{e}</p>
          })}
        </div>
      </div>
      </div>
          <div className='pc-display-none'>
      <div className={'filter-box-subject '}>
        <div className='subject-nav-single d-flex flex-wrap pc-dislpay-none'>
        {
          props.wholesubject.map( (e ,key) =>{
            return <p onClick={props.clickHandler} self_value={e} className={`subject-nav-button ${props.activesubject === e ? "nav-active-subject" : ""}`}> {e} </p>
          })
        }        
        </div>
      </div>
          </div>
  </div>
  )
}
