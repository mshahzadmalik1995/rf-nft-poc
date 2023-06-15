'use client';

import sampleData from "@/app/data/data";
import { useEffect, useState, useContext } from "react";
import React from "react";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import MissionCard from "../missioncard";
import Header from "../header/page";
import MyContext from "@/app/context/mycontext";

// class StepProgressBar extends React.Component {
//     render() {
//       return (
//         <ProgressBar
//           percent={75}
//           filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
//         >
//           <Step transition="scale">
//             {({ accomplished }) => (
//               <img
//                 style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
//                 width="30"
//                 src="https://vignette.wikia.nocookie.net/pkmnshuffle/images/9/9d/Pichu.png/revision/latest?cb=20170407222851"
//               />
//             )}
//           </Step>
//           <Step transition="scale">
//             {({ accomplished }) => (
//               <img
//                 style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
//                 width="30"
//                 src="https://vignette.wikia.nocookie.net/pkmnshuffle/images/9/97/Pikachu_%28Smiling%29.png/revision/latest?cb=20170410234508"
//               />
//             )}
//           </Step>
//           <Step transition="scale">
//             {({ accomplished }) => (
//               <img
//                 style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
//                 width="30"
//                 src="https://orig00.deviantart.net/493a/f/2017/095/5/4/raichu_icon_by_pokemonshuffle_icons-db4ryym.png"
//               />
//             )}
//           </Step>
//         </ProgressBar>
//       );
//     }
//   }


const Home = () => {
    const [data, setData] = useState();
    const [dataUser, setDataUser] = useState();
    const userData = localStorage.getItem("myUserState");
    const parsedUserData = JSON.parse(userData);
    const [showMyMissions, setShowMyMissions] = useState();
    var missionIdToRemove = [];

    useEffect(() => {

        const getUserMissionData = async () => {

            try{

                const response = await fetch(`/api/getuserassociatemission?userId=${parsedUserData._id}`, {
                    method: 'GET',
                    headers: {"Content_Type":"application/json"},
                    
                })
                const data = await response.json()
                if(Object.keys(data.userMission).length != 0 && response.status === 200){
                    setDataUser(data.userMission);
                    data.userMission.forEach((userMission, index) => {
                        missionIdToRemove.push(userMission.missionId)
                    });
                    console.log("missionidtoremove array:",missionIdToRemove)
                }
                else{
                    setShowMyMissions("hidden")
                    console.log("no data found while fetching user mission!.")
                }
            } catch(e) {
                console.error('Error fetching data in fetching user mission :', e);
            }
        }
        getUserMissionData();

        const getMission = async () => {
            try{

                const response = await fetch(`/api/getmission`, {
                    method: 'GET',
                    headers: {"Content_Type":"application/json"},
                })
                const data = await response.json()
                console.log("response from API: ", data)
                if(Object.keys(data.mission.length != 0) && response.status === 200){
                    data.mission.forEach((mis , index) => {
                        var isMissionPresent = missionIdToRemove.includes(mis._id);
                        if(isMissionPresent){
                            delete data.mission[index]
                        }
                    });
                 setData(data.mission);
                 console.log("inside if block. filtered JSON:", data.mission)
                } else {
                    console.log("no data found while fetching all missions!")
                }
            } catch(e) {
                console.error('Error fetching data in fetching all mission :', e);
            }
        }
        getMission();

    },[])
    

    return (
        <div className="flex flex-col gap-2 relative">
        <Header />
        <div className="mt-10" hidden={showMyMissions}>
            <h1 className="text-black-400 font-bold p-2 text-2xl">Enrolled Missions</h1>
            <div className="flex absolute flex-wrap p-2 gap-2 mt-4">
                {
                    dataUser && dataUser.map((value, index) => {
                        return <MissionCard props={value} key={index} />
                    })
                }
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
        </div>
        <br></br>

            <div className="mt-10">
                <h1 className="text-black-400 font-bold p-2 text-2xl">New Missions Available</h1>
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