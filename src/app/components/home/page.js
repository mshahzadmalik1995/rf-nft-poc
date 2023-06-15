'use client';

import sampleData from "@/app/data/data";
import { useEffect, useState, useContext } from "react";
//import React from "react";
//import "react-step-progress-bar/styles.css";
//import { ProgressBar, Step } from "react-step-progress-bar";
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
                if(Object.keys(data.userMission).length != 0 && response.status === 200){
                    setDataUser(data.userMission);
                }
                else{
                    setShowMyMissions("hidden")
                    console.log("no data found while fetching user mission!.")
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
        <div className="mt-10" hidden={showMyMissions}>
            <h1 className="text-black-400 font-bold p-2 text-2xl">My Missions</h1>
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