import './Login.css'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContextProvider, useAuthContext } from '../context';
import { Link } from 'react-router-dom';
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
  //   <div className="login-container">
  //   <h2>Login</h2>
  //   <form className="login-form" onSubmit={handleButton}>
  //     <input type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
  //     <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
  //     <button type="submit">Login</button>
  //   </form>
  //   <button className="register-button" onClick={handleRegeister}>Register here</button>
  // </div>
  <section className="bg-gray-50 dark:bg-gray-700">
  <div className="flex flex-col items-center justify-center px-4 py-6 mx-auto md:h-screen lg:py-0">
     
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleButton}>
                  <div>
                      <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >Your name</label>
                      <input type="text" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com or name" required="" value={username} onChange={(e) => setUsername(e.target.value)}/>
                  </div>
                  <div>
                      <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="text" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" value={password} onChange={(e) => setPassword(e.target.value)}/>
                  </div>
                
                  <button type="submit" className="w-full text-white bg-green-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Don’t have an account yet? <Link to="register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
  );
};
