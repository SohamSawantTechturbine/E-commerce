import { BrowserRouter, Route, Routes,useNavigate } from 'react-router-dom'
import { Home } from "./components/Home"
import { Login } from "./components/Login"
import './App.css'
import { Register } from './components/Register'
import { AuthContextProvider, useAuthContext} from './context'
import { About } from './components/About/About'
import Contact from './components/Contact/Contact'
import { Navbar } from './components/Navbar/Navbar'
import { useState,useEffect } from 'react'
import Footer from './components/Footer/Footer'
import Addcart from './components/AddCart/Addcart'
import Payment from './components/Payment/Payment'
import Success from './components/Success'
import Cancel from './components/Cancel'


function App() {

  const [searchTerm, setSearchTerm] = useState('');
  const {login,setIsLogin}=useAuthContext();
  // const navigate = useNavigate();
  useEffect(() => {

    const token = localStorage.getItem("token");
    console.log(token)
    // if (token) {
      // setIsLogin(true);
      // navigate("/home")
    // }
  }, []);
  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };
 
  
  return (
    <>
      {/* <Login/> */}
      <AuthContextProvider>
      
        <BrowserRouter>
        <Navbar onSearchChange={handleSearchChange} />
     
          <Routes>   <Route path="/" element={<Login />} />
            <Route path='/home' element={<Home  searchTerm={searchTerm} />} />
         
            <Route path="/register" element={<Register />} />
            <Route path="/about"  element={<About/>}/>
            <Route path="/contact"  element={<Contact/>}/>
            <Route path="/addcart" element={<Addcart/>}/>
            <Route path="/payment" element={<Payment/>}/>
            <Route path="/success" element={<Success/>}/>
           <Route path="/cancel" element={<Cancel/>}/>
          </Routes>
          <Footer/>
        </BrowserRouter>
      </AuthContextProvider>
    </>
  )
}

export default App
