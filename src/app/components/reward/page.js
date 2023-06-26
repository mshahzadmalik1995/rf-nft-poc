'use client';

import sampleData from "@/app/data/data";
import { useEffect, useState } from "react";
import Header from "../header/page";
import { useRouter } from 'next/navigation';
import {
    Button,
  } from "@material-ui/core";
import Image from "next/image";

  const Reward = () => {
   // const [data, setData] = useState(sampleData);
    const [userMissionData, setUserMissionData] = useState();
    const router = useRouter();

    useEffect(() => {
        const userData = localStorage.getItem("myUserState");
        const parsedUserData = JSON.parse(userData);
        const updateUser = async() => {
            try{
                const response = await fetch(`/api/updateuser?userId=${parsedUserData._id}`, {
                  method: 'POST',
                  headers: {"Content_Type":"application/json"},
                })
                if(response.status === 200){
                  
                  console.log("data updated")
                }
              } catch(e) {
                console.log(e);
              }
        }
        updateUser()
    }, [])


    useEffect(() => {
        const userLoginData = localStorage.getItem("myUserState");
        const updatedUserLoginData = JSON.parse(userLoginData);
        const getUserAssociateMission = async () => {
            try{
                const response = await fetch(`/api/getrecentupdatedusermission?userId=${updatedUserLoginData._id}`, {
                    method: 'GET',
                    headers: {"Content_Type":"application/json"},
                })
                const data = await response.json()
                console.log(data)
                if(response.status === 200){
                    setUserMissionData(data.userMissionData);
                } else {
                    console.log("no data found while fetching mission!")
                }
            } catch(e) {
                console.error('Error fetching data in fetching mission :', error);
            }
        }
        getUserAssociateMission();
    },[])

    
    function getPosition(string, substring, index) {
        return string.split(substring, index).join(substring).length;
    }

    
    const handleSubmit = (e) => {
        e.preventDefault();
        router.push("/components/home");
      };

    
    return(
        userMissionData && <div className="flex flex-col items-center mt-2">
            <div className="relative flex items-center justify-center w-92 h-48 p-1 mt-1">
                <div className="absolute inset-0 min-w-full rounded-lg ml-3">
                    <img
                        src={`${userMissionData.missionImagePath}`}
                        alt="background image"
                        className="w-96 h-48 min-w-full items-center justify-center rounded-lg"
                    />
                </div>
                <div className="relative z-10  top-8 w-80 h-10 capitalize mx-1 ml-5">
                    <h1 className='text-lg font-bold text-white  break-word'>{userMissionData.missionName.substring(0, getPosition(userMissionData.missionName, " ", 2))}</h1>
                    <h1 className="text-lg font-bold text-red-700">{userMissionData.missionName.substring(getPosition(userMissionData.missionName, " ", 2)+1)}</h1>
                </div>
            </div>
              <div className="flex flex-col  items-center justify-center mt-3 w-72 gap-2 p-2">
                <img src={userMissionData.nftImagePath} className="w-full max-w-15 max-h-20 object-contain" />

                    <div className="flex flex-col items-center justify-center gap-2">
                        <h1 className="text-lg font-bold items-center text-red-600">Congratulations</h1>
                        <h1 className="text-lg  items-center ">Mission Complete</h1>
                        <span className="text-sm font-medium text-red-500">How to trade NFT Token</span>
                        <span className="text-sm font-medium items-center break-words">You can trade this token or redeem it for discounts on apparels on the Royal Enfield Store</span>
                    </div>

                <button className="w-72 text-white bg-red-600  rounded-lg mt-3  p-2 disabled:opacity-25" 
                   onClick={handleSubmit}>My Dashboard</button>
              </div>
        </div>
    )
}

export default Reward;