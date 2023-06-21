"use client";
import { useState,useEffect, useContext } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import MyContext from "@/app/context/mycontext";
const RegisterForMission = () => {

    const [missionData, setMissionData] = useState();
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const router = useRouter()
    
    const [status, setStatus] = useState(null);
    //const {userLoginData} = useContext(MyContext);
    const [imageName, setImageName] = useState(null);
    //console.log(userLoginData)
    const [isCheck, setIsCheck] = useState(false);
    const [userData, setUserData] = useState({
      fullName:"",
      emailId:"",
      contactNo:"",
      pincode:"",
      cryptoAddress:"",
      userId:""
    })
    const searchParams = useSearchParams();
    const missionId = searchParams.get("missionId");
    const missionCode = searchParams.get("missionCode");

    let updatedUserLoginData = null;

    useEffect(() => {
        const userLoginData = localStorage.getItem("myUserState");
         updatedUserLoginData = JSON.parse(userLoginData);

        // console.log(updatedUserLoginData)
        setUserData( {
            ...userData,
            fullName: updatedUserLoginData.username,
            emailId: updatedUserLoginData.email,
            contactNo: updatedUserLoginData.contactNo,
            pincode: updatedUserLoginData.pincode,
            userId: updatedUserLoginData._id
        })
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
            } catch(error) {
                console.error('Error fetching data in fetching mission :', error);
            }
        }
        getMissionNftConfigurations(missionCode);
    },[])*/

    const str1 = "All Explorer take the wheel";
    function getPosition(string, substring, index) {
        return string.split(substring, index).join(substring).length;
    }

    function handleChange (e) {
        const name = e.target.name;
        const value = e.target.value;
    
        setUserData((prevData) => ({...prevData, [name]: value}));
      }

      function checkboxChange(e) {
        if(e.target.checked){
          setIsCheck(current => !current);
          setButtonDisabled(current => !current);
        } else {
          setButtonDisabled(current => !current);
        }
      }

      const handleSubmit = async (e) => {
        e.preventDefault();
        try{
          const response = await fetch('/api/saveuserassociatemission', {
            method: 'POST',
            headers: {"Content_Type":"application/json"},
            body:JSON.stringify({
                fullName:userData.fullName,
                emailId:userData.emailId,
                contactNo:userData.contactNo,
                pinCode:userData.pincode,
                cryptoAddress:userData.cryptoAddress,
                userId:userData.userId,
                missionId:missionId,
                missionCode:missionData.missionCode,
                missionName:missionData.missionName,
                missionDescription: missionData.missionDescription,
                missionCompleted:false,
                missionCheckList: missionData.missionCheckList,
                totalMissionChecklistCount: missionData.checkListCount,
                missionChecklistCountComplete:0,
                missionImageName: missionData.missionImageName,
                missionImagePath: missionData.missionImagePath,
                nftId: missionData.nftId
            })
          })
          if(response.status === 200){
            setUserData({
                fullName:"",
                emailId:"",
                contactNo:"",
                pincode:"",
                cryptoAddress:""
            })
            setStatus('success')
           router.push("/components/home")
          } else {
            setStatus('error')
          }
        } catch(e) {
          console.log(e);
        }
    
      };

    return(
        missionData && <div className="flex flex-col items-center mt-2">
             <div className="relative flex items-center justify-center w-92 h-48 p-1 mt-1">
                <div className="absolute inset-0 rounded-lg ml-5">
                    <img
                        src={`${missionData.missionImagePath}`}
                        alt="background image"
                        className="w-96 h-48 items-center justify-center rounded-lg"
                    />
                </div>
                <div className="relative z-10  top-8 w-80 h-10 capitalize mx-1 ml-5">
                    <h1 className='text-lg font-bold text-white  break-word'>{missionData.missionName.substring(0, getPosition(missionData.missionName, " ", 2))}</h1>
                    <h1 className="text-lg font-bold text-red-700">{missionData.missionName.substring(getPosition(missionData.missionName, " ", 2)+1)}</h1>
                </div>
              </div>
              <div className="flex flex-col  items-start mt-3 w-72 gap-2">
                <h1 className="text-sm text-red-700">Fill details to register:</h1>
                <div className="flex flex-col gap-2">
                    <label className="text-sm text-black font-bold">Full Name:</label>
                    <input type="text" placeholder="Enter the name" 
                    className="border-2 rounded-lg p-1 w-72" name="fullName" value={userData.fullName} onChange={handleChange}/>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm text-black font-bold">Email Id:</label>
                    <input type="text" placeholder="Enter the emailId" 
                    className="border-2 rounded-lg p-1 w-72" name="emailId" 
                    value={userData.emailId} onChange={handleChange} disabled="true"/>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm text-black font-bold">Contact Number:</label>
                    <input type="number" placeholder="Enter the number" 
                    className="border-2 rounded-lg p-1 w-72"  name="contactNo"
                     value={userData.contactNo} onChange={handleChange}  disabled="true"/>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm text-black font-bold">Pincode:</label>
                    <input type="number" placeholder="Enter the pincode" 
                    className="border-2 rounded-lg p-1 w-72" name="pincode"
                     value={userData.pincode} onChange={handleChange}  disabled="true"/>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm text-black font-bold">Crypto Address:</label>
                    <input type="text" placeholder="Enter the eth address" 
                    className="border-2 rounded-lg p-1 w-72"  name="cryptoAddress" value={userData.cryptoAddress} onChange={handleChange}/>
                </div>
                
                <div className="flex flex-col gap-2">
                <label className=" text-sm break-words">
                    <b>Disclaimer:</b> By signing this form/checking this box, you acknowledge and agree that we may use the information you share with us, to communicate with you through e-mails, text messages, WhatsApp and calls, in order to provide our product or service related information and/or for promotional and marketing purposes. All information provided will be secured and processed as per our privacy policy. 
                </label>
                </div>
                <div className="flex gap-2">
                    <input type="checkbox" id="disclaimer" name="disclaimer" value={isCheck} onChange={checkboxChange}/>
                    <label className="text-xs break-words">I accept the terms and conditions as well as the privacy policy </label> 
                </div>
                {status === 'success' && <p className="text-green-600">Data saved successfully!</p>}
            {status === 'error' && <p className="text-red-600">There was an error submitting your data. Please try again.</p>}
                <button className="w-72 text-white bg-red-700 p-1 rounded-lg mt-2 mb-2 disabled:opacity-25" 
                    disabled={buttonDisabled} onClick={handleSubmit}>Register</button>
              </div>
        </div>
    )
}

export default RegisterForMission;