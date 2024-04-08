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
   // const[mode ,setMode]=useState('light')
    //const[modename,setmodename]=useState('switch DarkMode')
    const [producttitle, setproducttitle] = useState([]);
    // useEffect(() => {
    //     const storedMode = localStorage.getItem('mode');
    //     const storedModeName=localStorage.getItem('modename')
    //     if (storedMode) {
    //         setMode(storedMode);
    //         setmodename(storedModeName)
    //           // document.body.style.backgroundColor = newMode === 'light' ? '#FFFFFF' : '#042743';
    //     }
    // }, []);

   
//     useEffect(() => {
//         localStorage.setItem('mode', mode);
//         localStorage.setItem('modename',modename)
//     }, [mode]);

//     const toggleMode = () => {
//         setMode(currentMode => (currentMode === 'light' ? 'dark document.body.style.backgroundColor = "#042743"' : 'light  document.body.style.backgroundColor = "white"'));
//         setmodename(prev=>{prev==='switch DarkMode '?'switch LightMode':'switch DarkMode  '})
//    // document.body.style.backgroundColor = newMode === 'light' ? '#FFFFFF' : '#042743';
//  };

    const providerValue = { isLogin, setIsLogin, register,  SetRegister,usernameInput, setUsernameInput,cartdata,setcartdata,totalPrice, setTotalPrice, producttitle, setproducttitle};
 
    // Return the context provider
    return React.createElement(AuthContext.Provider, { value: providerValue }, children);
};
