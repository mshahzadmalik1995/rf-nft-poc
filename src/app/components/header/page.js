"use client"
import { RxAvatar } from 'react-icons/rx'
import { FaShoppingCart } from 'react-icons/fa'
import { BsFillDatabaseFill } from 'react-icons/bs'
import MyContext from "@/app/context/mycontext";
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
const Header = () => {


    //const {userLoginData} = useContext(MyContext);
    //const userLoginData = localStorage.getItem("myUserState");
    var updatedUserLoginData;
    //console.log(updatedUserLoginData.username)
    const [userName, setUserName] = useState();
    const [userData, setUserData] = useState();
    const [userNftData, setUserNftData] = useState();
    const router = useRouter();
    const [userShowingData, setUserShowingData] = useState({
        totalMissionCount: "0",
        totalMissionComplete: "0",
    })

    const handleLogout = () => {
        localStorage.clear();
        router.push("/");
        console.log('Logged out');
    };


    useEffect(() => {
        const userLoginData = localStorage.getItem("myUserState");
        updatedUserLoginData = JSON.parse(userLoginData);
        setUserName(updatedUserLoginData.username)
        const getUserMissionData = async () => {

            try {

                const response = await fetch(`/api/getuserassociatemission?userId=${updatedUserLoginData._id}`, {
                    method: 'GET',
                    headers: { "Content_Type": "application/json" },

                })
                const data = await response.json()
                console.log(data)
                if (Object.keys(data.userMission).length != 0 && response.status === 200) {
                    setUserData(data.userMission);
                    const missionData = data.userMission;
                    console.log("missionDAta", missionData)
                    console.log(missionData.length)
                    const value = missionData.filter((data) => data.missionCompleted === true);
                    console.log("value", value);
                    console.log(value.length)
                    setUserShowingData((prev) => ({ ...prev, totalMissionCount: missionData.length, totalMissionComplete: value.length }));
                    const nftAssign = value.filter((data) => data.tokenId !== null);
                    console.log("nftAssign", nftAssign)
                    setUserNftData(nftAssign);
                    console.log(userShowingData)
                }
                else {
                    console.log("no data found while fetching user mission!.")
                }
            } catch (e) {
                console.error('Error fetching data in fetching user mission :', e);
            }
        }
        getUserMissionData();
    }, [])
    return (
        <div className="flex flex-col flex-wrap">
            <div className="relative  p-3">
                <div className="absolute inset-0">
                    <img
                        src="/header.jpg"
                        alt="background image"
                        style={{ height: '16em', width: '100%', borderBottomRightRadius: '3.5rem' }}
                        className="object-cover"
                    />
                </div>
                <div style={{ textAlign: '-webkit-center' }} className="relative">
                    <img
                        src="/royalenfield.png"
                        alt="company logo"
                        style={{ width: '10em', alignSelf: 'center' }}
                    />
                </div>
                <br />
                <div className="relative z-10 flex justify-between p-1">
                    <div className="flex gap-10 items-center justify-between">
                        <div className="relative">
                            <img src="/token3.jpg" alt="background image" className="w-12 h-12 rounded-full" />
                            <img src="/token2.jpg" alt="background image" className="absolute top-0 left-4   w-12 h-12 rounded-full" />
                            <img src="/token2.jpg" alt="background image" className="absolute top-0 left-8   w-12 h-12 rounded-full" />
                            <img src="/token2.jpg" alt="background image" className="absolute top-0 left-12   w-12 h-12 rounded-full" />
                        </div>
                        <Link title='Click here to claim nft' href={"/components/claimnft"}>
                            <p className="ml-3 text-sm text-white border bg-transparent p-1 rounded-2xl">{userNftData && userNftData.length} NFT Tokens</p>
                        </Link>
                    </div>
                    <div className="flex gap-2 items-center">
                        <div className="border rounded-full  p-2">
                            <FaShoppingCart size="1rem" color="white" />
                        </div>
                        <RxAvatar size="2rem" color="white" title="Click to logout" onClick={handleLogout} />
                    </div>
                </div>
                <div className="relative z-10 flex flex-col mt-3">
                    <h1 style={{ fontFamily: 'sans-serif' }} className='text-lg font-bold text-white  break-word'>Hi <span style={{ fontFamily: 'sans-serif' }} className="text-red-600 text-lg">{userName}</span></h1>
                    <p style={{ fontFamily: 'sans-serif' }} className='text-sm text-white  break-word'>Welcome to Royal Enfield</p>
                </div>
                <div className="relative z-10 flex justify-end items-end mr-5">
                    <div className=" bg-red-800 rounded-full  p-3 mb-3">
                        <BsFillDatabaseFill size="1rem" color="white" />
                    </div>
                    <div className="flex flex-col">
                        <span style={{ fontFamily: 'sans-serif' }} className="text-white  text-sm">Mission</span>
                        <span style={{ fontFamily: 'sans-serif' }} className='text-white  text-sm'>Status</span>
                        {/*<span className="text-red-800 "><span className="text-4xl font-bold">2</span>/5</span>*/}
                        <span className="text-red-800 "><span className="text-4xl font-bold">{userShowingData.totalMissionComplete}</span>/{userShowingData.totalMissionCount}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;