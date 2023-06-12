"use client"
import {RxAvatar} from 'react-icons/rx'
import {FaShoppingCart} from 'react-icons/fa'
import {BsFillDatabaseFill} from 'react-icons/bs'
import MyContext from "@/app/context/mycontext";
import { useContext, useEffect, useState } from 'react';
const Header = () => {

    
    //const {userLoginData} = useContext(MyContext);
    //const userLoginData = localStorage.getItem("myUserState");
    var updatedUserLoginData;
    //console.log(updatedUserLoginData.username)
    const [userName, setUserName] = useState();

    useEffect(() => {
        const userLoginData = localStorage.getItem("myUserState");
        updatedUserLoginData = JSON.parse(userLoginData);
       setUserName(updatedUserLoginData.username)
    },[])
    return (
        <div className="flex flex-col  h-60 p-2 mt-2">
            <div className="relative  h-60 p-3">
                <h1 className="relative z-10 text-lg text-center font-bold italic text-red-500 ">Royal Enfield</h1>
                <div className="absolute inset-0  h-64 lg:rounded-lg sm:rounded-br-3xl">
                    <img
                        src="/expedition2.jpg"
                        alt="background image"
                        className="w-screen h-64 object-cover lg:rounded-lg sm:rounded-br-3xl"
                    />
                </div>
                <div className="relative z-10 flex justify-between p-1">
                    <div className="flex gap-3 items-center justify-center">
                        <div className="relative">
                            <img src="/token3.jpg" alt="background image" className="w-12 h-12 rounded-full"/>
                            <img src="/token2.jpg" alt="background image" className="absolute top-0 left-0  ml-5 w-12 h-12 rounded-full"/>
                        </div>
                        <p className="ml-3 text-sm text-white border bg-transparent p-1 rounded-2xl">2 NFT Tokens</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <div className="border rounded-full  p-2">
                            <FaShoppingCart size="1rem" color="white" />
                        </div>
                        <RxAvatar size="2rem" color="white" />
                    </div>
                </div>
                <div className="relative z-10 flex flex-col mt-3">
                    <h1 className='text-lg font-bold text-white  break-word'>Hi <span className="text-red-600 text-lg">{userName}</span></h1>
                    <p className='mt-4 text-sm text-white  break-word'>Welcome to Royal Enfield</p>
                </div>
                <div className="relative z-10 flex justify-end items-end mr-5">
                        <div className=" bg-red-800 rounded-full  p-3 mb-3">
                            <BsFillDatabaseFill size="1rem" color="white" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-red-800 text-sm">Mission</span>
                            <span className='text-white text-sm'>Status</span>
                            <span className="text-red-800 "><span className="text-4xl font-bold">2</span>/5</span>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default Header;