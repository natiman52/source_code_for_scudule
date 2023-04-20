import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import { Navbar } from './Components/Navbar';
import Signup from './Components/Signup';
import Sidebar from './Components/BarComponents/Sidebar';
import Mainbar from './Components/BarComponents/Mainbar';
import CreateSchedule from './Components/CreateSchedule';
import Footer from './Components/Footer';
import {useState,useEffect} from "react"
import axios from "axios"
import "./Components/BarComponents/bar.css"
function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
          var cookie = cookies[i].trim();
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}
const WholeSubject= [
  "All",
  "Maths",
  'Physics',
  'Amharic',
  "English",
  "Biology",
  "Chemistry",
  "Geogarphy",
  "Civic",
  "History",
  "Geez",
  "Ethics"
]
var AllGrade = [
  "9A","9B","10A","10B","11A","11B","12A","12B"
]
const OriginUrl =process.env.REACT_APP_ORIGIN_URL
function App() {
  const [ShowLoginForm,setShowLoginForm] = useState(false)
  const [ShowNavBar,setShowNavBar] = useState(false)
  const[ShowCreateForm,setShowCreateForm] = useState(false)
  const [AuthUser, setAuthUser] =useState( window.localStorage.getItem("file_name")? true : false)
  const [isStaff,setIsStaff] = useState(window.localStorage.getItem("is_staff"))
  const [Profile,setProfile]=useState(window.localStorage.getItem('profile'))
  const [Schedule,setSchedule]= useState([])
  const [CurrentSubject,setCurrentSubject] = useState([])
  const [CurrentGrade,setcurrentGrade]=useState([])

  async function getSchedule(e){
    var subject_value = e.target.attributes.self_value ? e.target.attributes.self_value.value : CurrentSubject
    var grade_value =e.target.attributes.self_value_grade ? e.target.attributes.self_value_grade.value : CurrentGrade 
    if(subject_value === "All"){
      await axios.get(`${OriginUrl}api/get_schedule/?grade=${grade_value}`).then( e =>{
        setSchedule(()=> [...e.data] )
        setCurrentSubject(() => subject_value )
        setcurrentGrade(() => grade_value)
        console.log(e.data[0])
      })
    }else {
      await axios(`${OriginUrl}api/get_schedule/?subject=${subject_value}&grade=${grade_value}`).then( e => {
          setSchedule(prevData => [ ...e.data ])
          setCurrentSubject(() => subject_value )
          setcurrentGrade(() => grade_value)
      })
    }
  }
  function LoginFormShow(){
    setShowLoginForm(prevData => true )
  }
  function LoginFormHide(){
    setShowLoginForm(prevData => false )
  }
  function CreateFromShow(){
    setShowCreateForm(()=> true)
  }
  function CreateFormHide(){
    setShowCreateForm(()=> false)
  }
  function LogOut(e){
      window.localStorage.removeItem("file_name")
      window.localStorage.removeItem("is_staff")
      window.localStorage.removeItem("username")
      setAuthUser( () => false )
      setIsStaff(prevData => false)
  }

  useEffect( ()=>{
    const StartSubject = async () =>{
      await axios(`${OriginUrl}api/get_schedule/?grade=9A`).then( e => {
        setSchedule(prevData => [ ...e.data ])
        setCurrentSubject(() => "All" )
        setcurrentGrade(() => "9A" )
      })
    }
    if(AuthUser){
      const get_user_model = async () =>{
        var csrftoken =getCookie("csrftoken")
        const apiCall = await axios.post(`${OriginUrl}api/get_user/`,{file_name:window.localStorage.getItem("file_name")},{headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken
        }}).then(e =>{
          console.log(e)
          localStorage.setItem("is_staff",e.data.is_staff)
          localStorage.setItem("profile", JSON.stringify(e.data) )
          setIsStaff(prev => e.data.is_staff)
          setProfile(prev =>{return {...e.data}})
          console.log(e)
        })
      }
      get_user_model()
    }
    StartSubject()
  },[AuthUser])
  function CloseNav(e){
    setShowNavBar(()=> false)
  }
  function OpenNav(e){
    setShowNavBar(()=> true)
  }
  return (
    <>
    <div className='wrapper'>
      <Navbar originurl={OriginUrl} allgrade={WholeSubject.slice(1)} get_cookie={getCookie} User={AuthUser} isstaff={isStaff} opennav={OpenNav} logout={LogOut} createshow={ CreateFromShow }  loginShow={ LoginFormShow }/>

    {ShowLoginForm && <Signup getCookie={getCookie} setAuthUser={setAuthUser} setShowLoginForm={setShowLoginForm}  loginHide={ LoginFormHide } />}
    {ShowCreateForm && <CreateSchedule getschedule={getSchedule} get_cookie={getCookie} allgrade={AllGrade} wholesubject={WholeSubject} originurl={OriginUrl}  hideme={CreateFormHide}/>}
    <div className='d-flex'>
      <Sidebar currentsubject={CurrentSubject}  wholesubject={WholeSubject} clickHandler={getSchedule}/>
      <Mainbar activesubject={CurrentSubject} profile={Profile} activegrade={CurrentGrade} allgrade={AllGrade} scheduleretriever={getSchedule} wholesubject={WholeSubject} getcookies={getCookie} schedule={Schedule}/>
    </div>
    <Footer/>
    </div>
    <div className={ShowNavBar ? 'trans-holder slidebar-menu-opened pc-display-none' : 'trans-holder slidebar-menu-closed'}>
        <span onClick={CloseNav} style={{"color":"#fff"}} className="material-symbols-outlined close-button2 ">
        close
        </span>
      {AllGrade.map( e => {
             return <p onClick={e=>{
               CloseNav(e)
               return getSchedule(e)
            }} field_type="grade"  
            self_value_grade={e} 
            className={`${CurrentGrade === e ? "active-grade-slidebar": "" }`}>
              Grade {e}
              </p>
      })}
    </div>
    </>
  );
}

export default App;
