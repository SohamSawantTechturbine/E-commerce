import './Login.css'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContextProvider, useAuthContext } from '../context';

export const Login = () => {
  // const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [usernameInput, setUsernameInput] = useState('');
  const {setIsLogin , setUsernameInput,isLogin,usernameInput}  = useAuthContext()
  const navigate = useNavigate(); 

  function handleButton(e) {
    e.preventDefault()
    const storedUserData = JSON.parse(localStorage.getItem("userData")) || []; // Retrieve stored user data or initialize as empty array if no data is found

    const match = storedUserData.find(user => user.username.trim() === username.trim() && user.password.trim() === password.trim());

    if (match) {
      console.log(match.username)
      setUsernameInput(match.username)
        console.log(usernameInput)
        setIsLogin(true); 
    } else {
        alert("Invalid username or password. Click on Register to register yourself."); // Display message if no match is found
    }
}


  useEffect(() => {
    if (isLogin) {
      navigate('/home'); // Use navigate function to navigate to '/home'
    }
  }, [isLogin, navigate]);
 function handleRegeister(){
  navigate('/register');
 }
  return (
    // <AuthContextProvider value={{ usernameInput, setUsernameInput,username, setUsername,isLogin, setIsLogin }}>
      // <div>
      //   <input type="text" placeholder='Enter your username' value={username} onChange={(e) => setUsername(e.target.value)} />
      //   <input type="password" placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} />
      //   <button type="button" onClick={handleButton}>Login</button> {<br/>}
      //   <button type='button' onClick={handleRegeister}>Register here</button>
      // </div>
    // </AuthContextProvider>
    <div className="login-container">
    <h2>Login</h2>
    <form className="login-form" onSubmit={handleButton}>
      <input type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
    <button className="register-button" onClick={handleRegeister}>Register here</button>
  </div>
  );
};
