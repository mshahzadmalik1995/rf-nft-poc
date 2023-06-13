'use client';

import sampleData from "@/app/data/data";
import { useEffect, useState, useContext } from "react";
import MissionCard from "../missioncard";
import Header from "../header/page";
import MyContext from "@/app/context/mycontext";

const Home = () => {
    //const [data, setData] = useState(sampleData);
    //const [userId, setUserId] = useState();
    const [data, setData] = useState();
    const [dataUser, setDataUser] = useState();
    //const {userLoginData} = useContext(MyContext);
    const userData = localStorage.getItem("myUserState");
    const parsedUserData = JSON.parse(userData);
    //setUserId(parsedUserData._id);
   // console.log(`userLoginData ${userLoginData.username}`)

    useEffect(() => {
        const getMission = async () => {
            try{

                const response = await fetch(`/api/getmission`, {
                    method: 'GET',
                    headers: {"Content_Type":"application/json"},
                })
                const data = await response.json()
                setData(data.mission);
                if(response.status === 200){
                 //  router.push("/components/home")
                 //setData(data);
                 //console.log("inside if block")
                } else {
                    console.log("no data found while fetching all missions!")
                }
            } catch(e) {
                console.error('Error fetching data in fetching all mission :', error);
            }
        }
        getMission();

        const getUserMission = async () => {

            try{

                const response = await fetch(`/api/getuserassociatemission?userId=${parsedUserData._id}`, {
                    method: 'GET',
                    headers: {"Content_Type":"application/json"},
                    
                })
                const data = await response.json()
                setDataUser(data.userMission);
                console.log(data)
                if(response.status === 200){
                 //  router.push("/components/home")
                 //setData(data);
                 console.log("inside if block of user missions")
                } else {
                    console.log("no data found while fetching user mission!")
                }
            } catch(e) {
                console.error('Error fetching data in fetching user mission :', error);
            }
        }
        getUserMission();

    },[])
    

    return (
        <div className="flex flex-col gap-2 relative">
        <Header />
        <div className="mt-10">
            <h1 className="text-black-400 font-bold p-2 text-2xl">My Missions</h1>
            <div className="flex absolute flex-wrap p-2 gap-2 mt-4">
                {
                    dataUser && dataUser.map((value, index) => {
                        return <MissionCard props={value} key={index} />
                    })
                }
            </div>
        </div>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
            <div className="mt-10">
                <h1 className="text-black-400 font-bold p-2 text-2xl">All Missions</h1>
                <div className="flex absolute flex-wrap p-2 gap-2 mt-4">
                    {
                        data && data.map((value, index) => {
                            return <MissionCard props={value} key={index} />
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Home;