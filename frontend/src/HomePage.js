import React,{useState,useEffect} from 'react'
import "./HomePage.css"
import {Link} from "react-router-dom"
import axios from 'axios'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faBars,faLightbulb
,faSquarePollHorizontal,faGear} from "@fortawesome/free-solid-svg-icons"
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
export default function HomePage() {
    const [Comments,setComments] = useState([])
    const [Email,setEmail] =useState()
    const [Comment,setComment]= useState()
    const [CommentRefresher,setCommentRefresher] = useState(false)
    const [Toggle,setToggle] = useState(true)
    const emailHandler = e =>{
        setEmail(() => e.target.value)
    }
    const commentHandler = e =>{
        setComment( () => e.target.value)
    }
    useEffect( () => {
        async function myapicall(){
            await axios(`${process.env.REACT_APP_ORIGIN_URL}api/get_comment/`).then( e =>{
                setComments(( res ) => [...e.data])
            })
        }
        myapicall()
    },[CommentRefresher])
    async function sendComment(e){
        var csrf_token = getCookie("csrftoken")
        if (Email && Comment){
            await axios.post(`${process.env.REACT_APP_ORIGIN_URL}api/create_comment/`,{"email":Email,"comment":Comment},{headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': csrf_token
              }})
            setCommentRefresher( res => !res )
        }
    }
  return (
    <>
    <nav className='Navbar'>
        <div className='container-fluid'>
            <div className='navigation d-flex justify-content-between'>
                <p>ABGS ICT Club Project</p>
                <ul className="ph-display-none">
                    <li><Link to="/schedule" >Get to SchedulePrgoram</Link></li>
                    <li><a href='#Contact-Us'>Contact Us</a></li>
                </ul>
                <button onClick={e => {
                    setToggle(prev => !prev)
                }} className='navigation-button pc-display-none'> <FontAwesomeIcon icon={faBars}/> </button>
            </div>
            <ul className={`${Toggle? "homepage-toggle" : "base-css"} pc-display-none`}>
            <li><Link to="/schedule" >Get to SchedulePrgoram</Link></li>
            <li><a href='#Contact-Us'>Contact Us</a></li> 
            </ul>
        </div>
    </nav>
    <div className='main-slide'>
    <div className='container '>
        <div className='d-flex justify-content-center'>
            <img alt="" src={require("./abgs logo.jpg")} />
        </div>
            <div className=' realse'>
                 This is ABGS ICT Club frontpage we will try to add other different apps in the near future but for now the only App we have developed is <strong>SchedulePrgoram</strong> I hope everyone like's and supports our project <strong><i>Thank You</i></strong>
            </div>
    </div>
    </div>
<div className='container-fluid'>
        <div className='row justify-content-center m-sm-4 m-2'>
             <div className='col comment-div'>
                <p className='img-d'><FontAwesomeIcon icon={faLightbulb}/> </p>
                    <p className='title-d'>Vision</p>
                    <p className='comment-d'>we want to create different projects whic can solve problems of our school </p>
                </div>
                <div className='col comment-div'>
                <p className='img-d'><FontAwesomeIcon icon={faSquarePollHorizontal}/> </p>
                    <p className='title-d'>Plan</p>
                    <p className='comment-d'> to create programs that can make communication between parent and teacher easy and conventional </p>
                </div>
                <div className='col comment-div'>
                <p className='img-d'><FontAwesomeIcon icon={faGear}/> </p>
                    <p className='title-d'>Implemention</p>
                    <p className='comment-d'> we have created a program that can make teachers sending different activite easily acsisable for students </p>
                </div>
        </div>

</div>
<div className='form-container-homepage'>
        <h1 style={{"textAlign":"center"}}>Contact Us</h1>
        <div id="Contact-Us" className='Comment-Form'>
            <div className='email-field'>
                <p><label for="email">Email </label></p>
                <input onChange={emailHandler} className='email' type="email" id='email' placeholder="test@gmail.com" />
            </div>
            <div className='comment-field'>
                <p><label for="comment">Comment</label></p>
                <textarea onChange={commentHandler} id='comment' className='textarea' row="15" col="15"  />
            </div>
            <div className='button-field'>
                <button onClick={sendComment} className='btn btn-success size'>Submit</button>
            </div>
    </div>
    </div>
<footer>
        <div className='container '>
        <div className='d-flex flex-wrap justify-content-between'>
            <div className='about-us'>
            <h1>About Us</h1>
            <p> We are students from abune gorgorius school who love to create different programs and tackle problems as our first program we created a schedule program as you can see a very simple program if anybody has any question Contact Us with the form on the top</p>
            </div>

        </div>
        </div>
    </footer>
    </>
  )
}
