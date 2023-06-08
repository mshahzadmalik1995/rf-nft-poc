
"use client";

import {MdOutlineLocationOn} from 'react-icons/md';
import {GiCheckeredFlag} from 'react-icons/gi'
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import MissionCheckList from '../missionchecklist';

const ViewMission = ({params}) => {

    const missionId = params.missionId;

    const router = useRouter();

    const [missionData, setMissionData] = useState();

    useEffect(() => {
        const getMission = async (missionId) => {
            try{
                const response = await fetch(`/api/getmission?missionId=${missionId}`, {
                    method: 'GET',
                    headers: {"Content_Type":"application/json"},
                })
                const data = await response.json()
                console.log(data)
                if(response.status === 200){
                    setMissionData(data.mission);
                } else {
                    console.log("no data found while fetching mission!")
                }
            } catch(e) {
                console.error('Error fetching data in fetching mission :', error);
            }
        }
        getMission(missionId);
    },[])

    const buttonSubmit = (e) => {
        e.preventDefault();
        router.push(`/components/registerformission?missionId=${missionId}`)
    }

    const str1 = "All Explorer take the wheel";
    
    function getPosition(string, substring, index) {
        return string.split(substring, index).join(substring).length;
    }
    return(
        missionData && <div className="flex flex-col items-center mt-2">
            <div className="relative flex items-center justify-center w-92 h-48 p-1 mt-1">
                <div className="absolute inset-0 rounded-lg">
                    <img
                        src="/expedition1.jpg"
                        alt="background image"
                        className="w-92 h-48 items-center justify-center rounded-lg"
                    />
                </div>
                <div className="relative z-10  top-16 w-80 h-10 capitalize mx-1 ">
                    <h1 className='text-lg font-bold text-white  break-word'>{missionData.missionDescription.substring(0, getPosition(missionData.missionDescription, " ", 2))}</h1>
                    <h1 className="text-lg font-bold text-red-700">{missionData.missionDescription.substring(getPosition(missionData.missionDescription, " ", 2)+1)}</h1>
                </div>
            </div>
              <div className="flex flex-col  items-start mt-3 w-72 gap-2">
                <div className="flex flex-row items-center justify-end gap-5">
                    <span className="text-red-500 text-sm">Reward Token</span>
                    <span className="text-black text-sm">58 people rewarded</span>
                </div>
                <div className="flex items-center bg-yellow-100 border-yellow-400 border-2 rounded-lg gap-2 p-2">
                    <img src="/token1.png" alt="" className="w-12 h-12 rounded-full"/>
                    <div className="flex flex-col">
                        <h2 className="text-red-600 text-sm">NFT Token Name</h2>
                        <p className="text-xs">Lorem ipsum dolor sit amet, consecutor adisapic elit sed to eliptis</p>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <h1 className="text-sm text-red-700">Mission Details:</h1>
                    <p className="text-sm break-words">
                        {missionData.missionDetails}
                    </p>
                </div>
                {missionData.missionCheckList && <div className="flex flex-col gap-2">
                    {
                        missionData.missionCheckList.map((value, index) => {
                            return <MissionCheckList props={value} key={index} />
                        })
                    }
                </div>}
                <button className="w-72 text-white bg-red-700 p-1 rounded-lg mt-4 mb-2 " 
                  onClick={buttonSubmit}>Register</button>
              </div>
        </div>
    )
}

export default ViewMission;