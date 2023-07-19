'use client';

import sampleData from "@/app/data/data";
import { useEffect, useState } from "react";
import Header from "../header/page";
import { useRouter } from 'next/navigation';
import {
    Button,
} from "@material-ui/core";
import Image from "next/image";
import { FaShoppingCart } from 'react-icons/fa'
import { RxAvatar } from 'react-icons/rx'
import withAuth from "../authentication/page";

const Reward = () => {
    // const [data, setData] = useState(sampleData);
    const [userMissionData, setUserMissionData] = useState();
    const router = useRouter();

    useEffect(() => {
        const userData = localStorage.getItem("myUserState");
        const parsedUserData = JSON.parse(userData);
        const updateUser = async () => {
            try {
                const response = await fetch(`/api/updateuser?userId=${parsedUserData._id}`, {
                    method: 'POST',
                    headers: { "Content_Type": "application/json" },
                })
                if (response.status === 200) {

                    console.log("data updated")
                }
            } catch (e) {
                console.log(e);
            }
        }
        updateUser()
    }, [])


    useEffect(() => {
        const userLoginData = localStorage.getItem("myUserState");
        const updatedUserLoginData = JSON.parse(userLoginData);
        const getUserAssociateMission = async () => {
            try {
                const response = await fetch(`/api/getrecentupdatedusermission?userId=${updatedUserLoginData._id}`, {
                    method: 'GET',
                    headers: { "Content_Type": "application/json" },
                })
                const data = await response.json()
                console.log(data)
                if (response.status === 200) {
                    setUserMissionData(data.userMissionData);
                } else {
                    console.log("no data found while fetching mission!")
                }
            } catch (e) {
                console.error('Error fetching data in fetching mission :', error);
            }
        }
        getUserAssociateMission();
    }, [])


    function getPosition(string, substring, index) {
        return string.split(substring, index).join(substring).length;
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        router.push("/components/home");
    };


    return (
        userMissionData && <div className="flex flex-col items-center mt-2">
            <div style={{ textAlign: '-webkit-center', marginTop: '1rem' }} className="relative">
                <img
                    src="/royalenfield.png"
                    alt="company logo"
                    style={{ width: '10em', alignSelf: 'center' }}
                />
            </div>
            <br />
            <div style={{ gap: '12rem' }} className="relative z-10 flex justify-between p-1">
                <div className="flex gap-10 items-center justify-between">
                    <p style={{ borderColor: 'black' }} className="text-sm border p-1 rounded-2xl">1 NFT Tokens</p>
                </div>
                <div className="flex gap-2 items-center">
                    <div style={{ borderColor: 'black' }} className="border rounded-full  p-2">
                        <FaShoppingCart size="1rem" />
                    </div>
                    <RxAvatar size="2rem" />
                </div>
            </div>
            <br />
            <div style={{ width: '25rem' }} className="relative flex items-center justify-center h-48 p-1">
                <div className="absolute inset-0 min-w-full rounded-lg">
                    <img
                        src={`${userMissionData.missionImagePath}`}
                        alt="background image"
                        className="h-48 min-w-full items-center justify-center rounded-lg"
                    />
                </div>
                <div className="relative z-10  top-8 w-80 h-10 capitalize mx-1 ml-5">
                    <h1 className='text-lg font-bold text-white  break-word'>{userMissionData.missionName.substring(0, getPosition(userMissionData.missionName, " ", 2))}</h1>
                    <h1 className="text-lg font-bold text-red-700">{userMissionData.missionName.substring(getPosition(userMissionData.missionName, " ", 2) + 1)}</h1>
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

export default withAuth(Reward);