'use client';

import sampleData from "@/app/data/data";
import { useEffect, useState, useContext } from "react";
import MissionCard from "../missioncard";
import Header from "../header/page";
import MyContext from "@/app/context/mycontext";
const Home = () => {
    //const [data, setData] = useState(sampleData);
    const [data, setData] = useState();
    const {userLoginData} = useContext(MyContext);
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
                console.log(data)
                if(response.status === 200){
                 //  router.push("/components/home")
                 //setData(data);
                 console.log("inside if block")
                } else {
                    console.log("no data found while fetching mission!")
                }
            } catch(error) {
                console.error('Error fetching data in fetching mission :', error);
            }
        }
        getMission();
    },[])

    return (
        <div className="flex flex-col gap-2 relative">
            <Header />
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