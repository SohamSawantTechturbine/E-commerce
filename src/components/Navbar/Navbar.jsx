
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../context';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export const Navbar = ({ onSearchChange }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [USername, setUSername] = useState('user');
    const { usernameInput,setIsLogin,isLogin,logout} = useAuthContext();
    const logoutacc=()=>{
        localStorage.removeItem("username");
                                       setUSername('user');
                                    //   //  navigate('/');
                                      localStorage.removeItem("token")
                                      setIsLogin(false);
}
    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
      //  console.log(storedUsername)
        if (storedUsername) {
            setUSername(storedUsername);
        }
    }, [isLogin,logoutacc]);

    const handleSearchChange = (event) => {
        const term = event.target.value;
        setSearchTerm(term);
        onSearchChange(term);
    };
    const navigate = useNavigate();
   
    const handleProceedToCart = () => {
        // Navigate to the cart page with the selected products

        navigate('/addcart')
    }
   

    return (

        <div className="">
            <nav className="bg-white border-gray-200 dark:bg-gray-900  mx-auto">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <div className="flex items-center">
                        <img src="https://t3.ftcdn.net/jpg/02/47/48/00/360_F_247480017_ST4hotATsrcErAja0VzdUsrrVBMIcE4u.jpg" className="h-8" alt="Flowbite Logo" />
                        <span className=" text-2xl font-semibold whitespace-nowrap dark:text-white">ShopCart</span>
                    </div>
                    <div className="flex md:order-2">
                        <button type="button" data-collapse-toggle="navbar-search" aria-controls="navbar-search" aria-expanded="false" className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1">
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                            <span className="sr-only">Search</span>
                        </button>
                        <div>

                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />

                        </div>
                        <div>
                            <Link to="/addcart" className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white px-3">
                                <img src="data:image/jpeg;base64,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" alt="Cart" className="w-8 h-8" />
                                {/* <span className="ml-2">Proceed to Cart ({cartdata.products.length})</span> */}
                            </Link>
                        </div>
                        <div className=" ml-4 flex items-center">
                            {USername && (
                                <div className=" mr-2 text-green-600 dark:text-white px-2">{USername}</div>
                            )}
                            {USername !=='user'&&  (
                                <button
                                    className="mr-2 text-green-600 dark:text-white px-2"
                                    // onClick={() => {
                                    //     localStorage.removeItem("username");
                                    //     setUSername('');
                                    //   //  navigate('/');
                                    //   localStorage.removeItem("token")
                                    //   setIsLogin(false);
                                    // }}
                                    onClick={logoutacc}
                                >
                                    Logout
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-search">
                        <div className="relative mt-3 md:hidden">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input type="text" id="search-navbar" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." />
                        </div>
                        


                        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <Link to="/home" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</Link>
                            </li>
                            <li>
                                <Link to="/about" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</Link>
                            </li>
                            <li>
                                <Link to="/contact" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact US</Link>
                            </li>
                        </ul>
                        <div className="flex items-center">

                        </div>
                       
                    </div>
                </div>
                
            </nav>
            <div className="flex items-center justify-center mt-3 mr-4 md:hidden">
                <img src="data:image/png;base64,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" className="h-2 w-2" alt="Flowbite Logo" />
                <p className="text-1xl font-semibold dark:text-white">{usernameInput}</p>
            </div>
        </div>
    )
}