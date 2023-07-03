'use client';

import sampleData from "@/app/data/data";
import { useEffect, useState, useContext } from "react";
import React from "react";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import MissionCard from "../missioncard";
import Header from "../header/page";
import MyContext from "@/app/context/mycontext";
import UserAssociateMissionCard from "../userassociatemissioncard";


const Home = () => {
    const [data, setData] = useState();
    const [dataUser, setDataUser] = useState();
    // const [showMyMissions, setShowMyMissions] = useState();
    const [showMyMissions, setShowMyMissions] = useState(true);
    //var missionIdToRemove = [];
    const missionIdToRemove = [];
    const [dynamicMargin, setDynamicMargin] = useState(0);

    useEffect(() => {
        const userData = localStorage.getItem("myUserState");
        const parsedUserData = JSON.parse(userData);
        const getUserMissionData = async () => {

            try {

                const response = await fetch(`/api/getuserassociatemission?userId=${parsedUserData._id}`, {
                    method: 'GET',
                    headers: { "Content_Type": "application/json" },

                })
                const data = await response.json()
                if (Object.keys(data.userMission).length != 0 && response.status === 200) {
                    setDataUser(data.userMission);
                    data.userMission.forEach((userMission, index) => {
                        missionIdToRemove.push(userMission.missionId)
                    });
                    console.log("missionidtoremove array:", missionIdToRemove)
                    setShowMyMissions(true);
                }
                else {
                    //setShowMyMissions("hidden")
                    setShowMyMissions((prev) => !prev);
                    console.log("no data found while fetching user mission!.")
                }
            } catch (e) {
                console.error('Error fetching data in fetching user mission :', e);
            }
        }

        const getMission = async () => {
            try {

                const response = await fetch(`/api/getmission`, {
                    method: 'GET',
                    headers: { "Content_Type": "application/json" },
                })
                const data = await response.json()
                console.log("response from API: ", data)
                const missionData = data.mission;
                if (Object.keys(data.mission.length != 0)) {
                    const filterData = missionData.filter((item) => !missionIdToRemove.includes(item._id));
                    console.log(`missionIdToRemove ${missionIdToRemove}`)
                    console.log(`filterData ${filterData}`)
                    //setData(data.mission);
                    setData(filterData)
                    console.log("inside if block. filtered JSON:", data.mission)
                } else {
                    console.log("no data found while fetching all missions!")
                }
            } catch (e) {
                console.error('Error fetching data in fetching all mission :', e);
            }
        }
        const fetchDataAndProcess = async () => {
            await getUserMissionData();
            await getMission();
        }
        fetchDataAndProcess()
    }, [])


    return (
        <div className="flex flex-col flex-wrap gap-2 w-full">
            <Header />

            {showMyMissions && <div className={`${showMyMissions ? `mt-2` : `mt-0`} `}>
                <h1 className="text-black-400 font-bold p-2 text-2xl">Enrolled Missions</h1>
                <div className="flex flex-wrap p-2 gap-2 mt-2">
                    {
                        dataUser && dataUser.map((value, index) => {
                            return <UserAssociateMissionCard props={value} key={index} />
                        })
                    }
                </div>
            </div>}

            <div className="mt-16">
                <h1 className="text-black-400 font-bold p-2 text-2xl">New Missions Available</h1>
                <div className="flex flex-wrap p-2 gap-2 mt-2">
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