import React, { createContext, useContext, useState ,useEffect} from 'react';

export const AuthContext = createContext({
    isLogin: false,
    setIsLogin: () => {},
    register: null,
    SetRegister: () => {},
    setUsernameInput: () => {},
    usernameInput:null,
    cartdata:[],
    setcartdata:()=>{},
   totalPrice:null,
   setTotalPrice:()=>{},
    producttitle:[],
    setproducttitle:()=>{},
    isLogin: false,
  setIsLogin: () => {},
  login: () => {},
  logout: () => {},
  products:null,
  setProducts:()=>{ },
  tokendata:"",
  settokendata:()=>{}
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false);
    const [register, SetRegister] = useState(null);
    const [usernameInput, setUsernameInput] = useState(null);
    const[cartdata,setcartdata]=useState([]);
    const [totalPrice, setTotalPrice] = useState();   
    const [products, setProducts] = useState([]);
    const [producttitle, setproducttitle] = useState([]);
    const [tokendata, settokendata] = useState([]);
    const login = () => {

        setIsLogin(true);
      };
    
      const logout = () => {

        setIsLogin(false);
      };
    

    const providerValue = { login, logout,products, setProducts, isLogin, setIsLogin, register,tokendata, settokendata,  SetRegister,usernameInput, setUsernameInput,cartdata,setcartdata,totalPrice, setTotalPrice, producttitle, setproducttitle};
 
    // Return the context provider
    return React.createElement(AuthContext.Provider, { value: providerValue }, children);
};
