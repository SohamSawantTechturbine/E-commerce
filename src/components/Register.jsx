// import React from 'react'
// import { useState,useEffect } from 'react'
// import { useNavigate } from 'react-router-dom';
// import { AuthContextProvider } from '../context';

// export const Register=()=> {
//     const [register,SetRegister]=useState()
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();
//     // function handleButton(){
//     //     if(username.trim()&& password.trim()){
//     //         localStorage.setItem('username', username);
//     //         localStorage.setItem('password', password);
//     //         alert("Register succesfully You can click on login Button and enjoy")
//     //     }
//     //     else{
//     //         alert("enter both UserName and password")
//     //     }
//     // }
//     let userData = JSON.parse(localStorage.getItem("userData")) || [];

//     function handleButton(){
//         if(username.trim()&& password.trim()){
//             saveData()
//            // localStorage.setItem('password', password);
//             alert("Register succesfully You can click on login Button and enjoy")
//         }
//         else{
//             alert("enter both UserName and password")
//         }
//     }
   
//     function saveData() {
//         userData.push[{ username,  password }];
//         localStorage.setItem('username', JSON.stringify(userData));
//     }
//     function handleLogin(){
//   navigate("/")
//     }
//   return (
//     <AuthContextProvider value={{register,SetRegister}}>
// <div>
// <input type="text" placeholder='Enter your username' value={username} onChange={(e) => setUsername(e.target.value)} />
//         <input type="password" placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} />
//         <button type="button" onClick={handleButton}>Register</button>{<br/>}
//         <button type='button' onClick={handleLogin}>Login  here</button>
// </div>
//     </AuthContextProvider>
  
//   )
// }

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContextProvider } from '../context';
import './Register.css'

export const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    let userData = JSON.parse(localStorage.getItem("userData")) || [];

    function handleButton(e) {
        e.preventDefault()
        if (username.trim()!=="" && password.trim()!==""&&username.trim() && password.trim()) {
            saveData();
            alert("Registered successfully. You can click on the login button and enjoy.");
        } else {
            alert("Enter both username and password");
        }
    }

    function saveData() {
        // Append new user data to userData array
        userData.push({ username, password });
        // Update userData in localStorage
        localStorage.setItem('userData', JSON.stringify(userData));
    }

    function handleLogin() {
        navigate("/");
    }

    return (
        // <AuthContextProvider>
           
        // </AuthContextProvider>
        <div className='register-container'>
        <form className="register-form" onSubmit={handleButton}>
            <input type="text" placeholder='Enter your username' value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Register</button><br/>
        </form>
        <button className="login-button" type='button' onClick={handleLogin}>Login here</button>
    </div>);
};

