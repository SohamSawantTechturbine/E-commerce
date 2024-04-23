import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContextProvider } from '../context';
import './Register.css';

export const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userNameValid, setUserNameValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);
    const [confirmPasswordValid, setConfirmPasswordValid] = useState(true);
    const navigate = useNavigate();

    let userData = JSON.parse(localStorage.getItem("userData")) || [];

    function handleButton(e) {
        e.preventDefault();
        if (username.trim() === '' || password.trim() === '') {
            toast.error("Enter both username and password");
            return;
        }
        if (password !== confirmPassword) {
            toast.error("Password and Confirm Password do not match");
            return;
        }
        const formData={
            username:username,
            password:password
        };
        fetch("http://localhost:9000/register-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
    
    .then(response => {
      if (response.ok) {
       
      } else {
        throw new Error("Failed to submit data");
      }
    })
    .catch(error => {
      console.error("Error submitting data:", error);
    });
  
        saveData();
        toast.success("Registered successfully. You can click on the login button and enjoy.");
    }

    function saveData() {
        userData.push({ username, password });
        localStorage.setItem('userData', JSON.stringify(userData));
    }

    function handleLogin() {
        navigate("/");
    }

    function validateUsername() {
        setUserNameValid(username.trim() !== '');
    }

    function validatePassword() {
        setPasswordValid(password.trim() !== '');
    }

    function validateConfirmPassword() {
        setConfirmPasswordValid(confirmPassword.trim() !== '');
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Create an account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleButton}>
                            <div>
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Username</label>
                                <input type="text" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} onBlur={validateUsername} className={`bg-gray-50 ${userNameValid ? 'border border-gray-300' : 'border-red-500'} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 `} placeholder="Enter your username" required />
                                {!userNameValid && <p className="text-red-500 text-xs italic">Username is required.</p>}
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" onBlur={validatePassword} value={password} onChange={(e) => setPassword(e.target.value)} className={`bg-gray-50 ${(!passwordValid && password !== '') ? 'border border-red-500' : 'border border-gray-300'} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} required />
                                {!passwordValid && <p className="text-red-500 text-xs italic">Password is required.</p>}
                            </div>
                            <div>
                                <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                                <input type="password" name="confirm-password" id="confirm-password" placeholder="••••••••" onBlur={validateConfirmPassword} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={`bg-gray-50 ${(!confirmPasswordValid && confirmPassword !== '') ? 'border border-red-500' : 'border border-gray-300'} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} required />
                                {!confirmPasswordValid && <p className="text-red-500 text-xs italic">Confirm Password is required.</p>}
                            </div>
                            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an Account</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account? <Link to="/" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Register;
