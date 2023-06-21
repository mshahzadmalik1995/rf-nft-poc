
"use client";

import {MdOutlineLocationOn} from 'react-icons/md';
import {GiCheckeredFlag} from 'react-icons/gi'
import { useEffect, useState, useContext } from "react";
import { useRouter,useSearchParams } from 'next/navigation';
import MissionCheckList from '../missionchecklist';
import MissionCheckListForRegisterUser from '../missionchecklistforregisteruser';
import MyContext from "@/app/context/mycontext";
import { checkCustomRoutes } from 'next/dist/lib/load-custom-routes';

const ViewMission = ({params}) => {

    const missionId = params.missionId;

    const router = useRouter();
    const searchParams = useSearchParams();
    const missionCode = searchParams.get("missionCode");

    //console.log(missionCode)

    const [missionData, setMissionData] = useState();
    const [status, setStatus] = useState(null);
    const [udpateUi, setUpdateUi] = useState(false);
    const [userAssociateMissionData, setUserAssociateMissionData] = useState();
    const [checkUserAssociate, setCheckUserAssociate] = useState(false);
    const [updatedUserCheckListData, setUpdatedUserCheckListData] = useState([])
    const [userId, setUserId] = useState();
    const {userLoginData} = useContext(MyContext);
   // console.log(`_id ${userLoginData.username}`)
    const [imageName, setImageName] = useState(null);

    const [userMissionUpdateData, setUserMissionUpdateData] = useState({
        missionCheckList:[],
        totalMissionChecklistCount:0,
        missionChecklistCountComplete:0,
        missionCompleted:false
    })

   

    
    

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

    useEffect(() => {
       // console.log(updateDatad.username)
       // console.log("hi second useeffect")
        const userData = localStorage.getItem("myUserState");
        //console.log(userData)
        const updateDatad = JSON.parse(userData);
        //console.log(updateDatad._id)
        console.log("in the userassociate mission api");
        setUserId(updateDatad._id)
        const getUserAssociateMissionData = async (missionId) => {
            try{
                const response = await fetch(`/api/getuserassociatemission?missionId=${missionId}&userId=${updateDatad._id}`, {
                    method: 'GET',
                    headers: {"Content_Type":"application/json"},
                })
                const data = await response.json()
                console.log(data)

                if(response.status === 200){
                    console.log("in status blcok");
                    if(data.userMission && data.userMission !== null){
                        setCheckUserAssociate(true);
                        console.log("datasaved");
                        setUserAssociateMissionData(data.userMission);
                        setUpdatedUserCheckListData(data.userMission.missionCheckList);
                    } else {
                        setCheckUserAssociate(false);
                    }
                    console.log(userAssociateMissionData)
                } else {
                    console.log("no data found while fetching mission!")
                }
                console.log(`checkUserAssociate ${checkUserAssociate}`)
            } catch(e) {
                console.error('Error fetching data in fetching mission :', error);
            }
        }
        getUserAssociateMissionData(missionId);
       // setUpdateUi(false);
    },[udpateUi])

   // console.log("setUserAssociateMissionData",userAssociateMissionData,udpateUi);

    /*useEffect(() => {
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
    },[])*/

    const buttonSubmit = (e) => {
        e.preventDefault();
        if(!checkUserAssociate){
            router.push(`/components/registerformission?missionId=${missionId}&missionCode=${missionCode}`)
        } 
    }

    const handleCheckboxChange = (event, id) => {
        console.log(`id ${id}`);
        const isChecked = event.target.checked;
        console.log(`isChecked ${isChecked}`)
        setUpdatedUserCheckListData(prevData => prevData.map(obj => obj.id === id ? {...obj, status: isChecked} : obj));
        console.log(updatedUserCheckListData)
    }

    const uploadDataToDb = async(e) => {
        e.preventDefault();
        console.log("uploadDataToDbcalled")
       // console.log(updatedUserCheckListData)
       // await updateUserAssociateDataFunction();
        console.log(userMissionUpdateData)
        try {
            const response = await fetch(`/api/updateuserassociatemission?userId=${userId}&missionId=${missionId}`, {
              method: 'POST',
              headers: { "Content_Type": "application/json" },
              body: JSON.stringify({missionCheckList:updatedUserCheckListData,
                totalMissionChecklistCount : userAssociateMissionData.totalMissionChecklistCount})
              //body: JSON.stringify(userMissionUpdateData)
            })
            const data = await response.json();
            if (response.status === 200) {
                console.log("data save successfully")
              setStatus('success')
            } else {
              setStatus('error')
            }
          } catch (e) {
            console.log(e);
          }
          //setStatus(null)
          setUpdateUi(!udpateUi);
    }

    const str1 = "All Explorer take the wheel";
    
    function getPosition(string, substring, index) {
        return string.split(substring, index).join(substring).length;
    }

    console.log(updatedUserCheckListData)
    return(
        missionData && <div className="flex flex-col items-center mt-2">
            <div className="relative flex items-center justify-center w-92 h-48 p-1 mt-1">
                <div className="absolute inset-0 rounded-lg  ml-5">
                    <img
                        src={`${missionData.missionImagePath}`}
                        alt="background image"
                        className="w-92 h-48 items-center justify-center rounded-lg"
                    />
                </div>
                <div className="relative z-10  top-8 w-80 h-10 capitalize  ml-6">
                    <h1 className='text-lg font-bold text-white  break-word'>{missionData.missionName.substring(0, getPosition(missionData.missionName, " ", 2))}</h1>
                    <h1 className="text-lg font-bold text-red-700">{missionData.missionName.substring(getPosition(missionData.missionName, " ", 2)+1)}</h1>
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
                        {missionData.missionDescription}
                    </p>
                </div>
                { checkUserAssociate == false ? missionData.missionCheckList && <div className="flex flex-col gap-2">
                    {
                        missionData.missionCheckList.map((value, index) => {
                            return <MissionCheckList props={value} key={index} />
                        })
                    }
                    </div> : userAssociateMissionData.missionCheckList && <div className="flex flex-col gap-2">
                        {
                            userAssociateMissionData.missionCheckList.map((value, index) => {
                                return <MissionCheckListForRegisterUser value={value} key={index} handleCheckboxChange={handleCheckboxChange}/>

                               // return <MissionCheckListForRegisterUser value={value} key={index}/>
                            })
                        }
                    </div>}
                    {
                        checkUserAssociate == false ?
                         <div>

                            <button className="w-72 text-white bg-red-700 p-1 rounded-lg mt-4 mb-2 " 
                          onClick={buttonSubmit}>Register</button>
                          </div> : 
                            <div className="flex flex-col w-full gap-2">
                                <div className="flex bg-black p-2 justify-center rounded-lg items-center mb-4">
                                    <span className='text-white'>{userAssociateMissionData.missionChecklistCountComplete}</span><span className="text-white">/{userAssociateMissionData.totalMissionChecklistCount} Completed</span>
                                    <div className="bg-blue-600 h-2.5 rounded-full dark:bg-gray-300" ></div>
                                </div>

                                {status === 'success' && <p className="text-green-600">Data saved successfully!</p>}
                                {status === 'error' && <p className="text-red-600">There was an error submitting your data. Please try again.</p>}
                                <div className="flex text-center justify-between w-full mt-3">
                                <button className="bg-red-700 p-2 text-white rounded-lg text-sm" onClick = {uploadDataToDb}>submit</button>
                                <button className="bg-red-700 p-2 text-white rounded-lg text-sm" onClick={(back) => router.back()}>Back</button>
                                </div>
                            </div>
                    }
              </div>
        </div>
    )
}

export default ViewMission;