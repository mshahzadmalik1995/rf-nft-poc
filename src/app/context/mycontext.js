"use client";
import { useContext, useState, createContext, useEffect } from "react";

const MyContext = createContext();

export function MyContextProvider ({children}) {

    const [userLoginData, setUserLoginData] = useState();

    useEffect(() => {
        // Load the state from local storage when the component mounts
        const savedUserState = localStorage.getItem('myUserState');
        if (savedUserState) {
           // const data = JSON.parse(savedUserState);
            setUserLoginData(savedUserState);
        }
      }, []);
    
     /* useEffect(() => {
        // Save the state to local storage whenever it changes
        //localStorage.removeItem("myUserState");
        localStorage.setItem('myUserState', JSON.stringify(userLoginData));
        //localStorage.setItem('myUserState', userLoginData);
      }, [userLoginData]);*/


      const userUpdateValue = (newValue) => {
       /* if(localStorage.getItem("myUserState") !== null) {
            localStorage.removeItem("myUserState");
        }*/
        localStorage.setItem('myUserState', JSON.stringify(newValue));
        setUserLoginData(newValue);
    }
    return(
        <MyContext.Provider value={{userLoginData, userUpdateValue}}>
            {children}
        </MyContext.Provider>
    )
}

export default MyContext;