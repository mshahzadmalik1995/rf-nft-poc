"use client";
import { useContext, useState, createContext } from "react";

const MyContext = createContext();

export function MyContextProvider ({children}) {

    const [userLoginData, setUserLoginData] = useState();

    const userUpdateValue = (newValue) => {
        setUserLoginData(newValue);
    }

    return(
        <MyContext.Provider value={{userLoginData, userUpdateValue}}>
            {children}
        </MyContext.Provider>
    )
}

export default MyContext;