"use client";
import { useRouter } from 'next/navigation';
import { useContext, useState, useEffect } from 'react';
import MyContext from "@/app/context/mycontext";

const MissionCard = ({props}) => {
    //const {name, missionName, description, backgroundImage, tokenImage, tokenDescription} = props;

    const router = useRouter();
    const {userLoginData} = useContext(MyContext);
    const {_id, missionCode, missionName, missionDescription } = props;
    const [imageName, setImageName] = useState(null);

    
    useEffect(() => {
        const getMissionNftConfigurations = async (missionCode) => {
            try{
                const response = await fetch(`/api/getnftconfiguration?missionCode=${missionCode}`, {
                    method: 'GET',
                    headers: {"Content_Type":"application/json"},
                })
                const data = await response.json()
                console.log(data)
                if(response.status === 200){
                    setImageName(data.configuration.imageName)
                } else {
                    console.log("no data found while fetching mission!")
                }
            } catch(e) {
                console.error('Error fetching data in fetching mission :', error);
            }
        }
        getMissionNftConfigurations(missionCode);
    },[])


    const buttonSubmit = (e) => {
        e.preventDefault();
        router.push(`/components/viewmission/${_id}?missionCode=${missionCode}`)
    }
    return(
        <div className="flex flex-col p-2 mt-2">
            <h1 className="text-lg text-red-500 ">{`Mission ${missionCode}`}</h1>
            <div className="relative w-96 h-50 p-1 mt-1">
                <div className="absolute inset-0 rounded-lg">
                    <img
                        src={`/${imageName}`}
                        alt="background image"
                        className="w-96 h-50 rounded-lg"
                    />
                </div>
                <div className="relative z-10 flex flex-col items-center justify-center w-80 h-40 ">
                    <h1 className='text-lg font-bold text-white  break-word'>{missionName}</h1>
                    <p className='mt-4 text-sm text-white  break-word'>{missionDescription.substring(0, 40)}</p>
                </div>
                <div className="relative z-10 flex justify-between items-center">
                    <div className="flex gap-1 items-center">
                        <img src='/token1.png' alt="background image" className="w-10 h-10 rounded-full"/>
                        <p className="text-sm text-white">NFT Token Reward</p>
                    </div>
                    <div className="items-center">
                        <button className="bg-red-600 text-white text-sm cursor-pointer rounded-lg p-1" 
                        onClick={buttonSubmit}>View Mission</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MissionCard;