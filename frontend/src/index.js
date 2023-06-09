import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Profile from './Components/Profile'
import HomePage from "./HomePage.js"
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<BrowserRouter>
 <Routes>
   <Route index element={<HomePage/>}/>
    <Route path='/schedule' element={<App/>}/>
    <Route path="/profile" element={<Profile/>}/>
 </Routes>
</BrowserRouter>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
