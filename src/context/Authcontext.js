import React, { createContext, useContext, useState } from 'react';

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
    mode:null,
    setMode:()=>{},
    modename:null, statemodename:()=>{},
    toggleMode: () => {},
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false);
    const [register, SetRegister] = useState(null);
    const [usernameInput, setUsernameInput] = useState(null);
    const[cartdata,setcartdata]=useState([]);
    const [totalPrice, setTotalPrice] = useState();   
    const [mode, setMode] = useState("light");
    const [modename, statemodename] = useState("enable Darkmode");
    const [producttitle, setproducttitle] = useState([]);
    const toggleMode = () => {
        if (mode === "light") {
            setMode("dark");
            document.body.style.backgroundColor = "#042743";
            statemodename("enable WhiteMode");
        } else {
            setMode("light");
            document.body.style.backgroundColor = "white";
            statemodename("enable DarkMode");
        }
    };
    const providerValue = { isLogin, setIsLogin, register,  toggleMode,SetRegister,usernameInput, setUsernameInput,cartdata,setcartdata,totalPrice, setTotalPrice, producttitle, setproducttitle,mode, setMode,modename, statemodename };
 
    // Return the context provider
    return React.createElement(AuthContext.Provider, { value: providerValue }, children);
};
