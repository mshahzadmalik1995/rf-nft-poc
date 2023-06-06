"use client";
import { useState } from "react";
const RegisterForMission = () => {

    const str1 = "All Explorer take the wheel";
    function getPosition(string, substring, index) {
        return string.split(substring, index).join(substring).length;
    }

    return(
        <div className="flex flex-col items-center mt-2">
             <div className="relative flex items-center justify-center w-92 h-48 p-1 mt-1">
                <div className="absolute inset-0 rounded-lg">
                    <img
                        src="/expedition1.jpg"
                        alt="background image"
                        className="w-92 h-48 items-center justify-center rounded-lg"
                    />
                </div>
                <div className="relative z-10  top-16 w-80 h-10 capitalize mx-1 ">
                    <h1 className='text-lg font-bold text-white  break-word'>{str1.substring(0, getPosition(str1, " ", 2))}</h1>
                    <h1 className="text-lg font-bold text-red-700">{str1.substring(getPosition(str1, " ", 2)+1)}</h1>
                </div>
              </div>
              <div className="flex flex-col  items-start mt-3 w-72 gap-2">
                <h1 className="text-sm text-red-700">Fill details to register:</h1>
                <div className="flex flex-col gap-2">
                    <label className="text-sm text-black font-bold">Full Name:</label>
                    <input type="text" placeholder="Enter the name" className="border-2 rounded-lg p-1 w-72"/>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm text-black font-bold">Email Id:</label>
                    <input type="text" placeholder="Enter the emailId" className="border-2 rounded-lg p-1 w-72"/>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm text-black font-bold">Contact Number:</label>
                    <input type="number" placeholder="Enter the number" className="border-2 rounded-lg p-1 w-72"/>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm text-black font-bold">Pincode:</label>
                    <input type="number" placeholder="Enter the pincode" className="border-2 rounded-lg p-1 w-72"/>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm text-black font-bold">Crypto Address:</label>
                    <input type="text" placeholder="Enter the eth address" className="border-2 rounded-lg p-1 w-72"/>
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
                <button className="w-72 text-white bg-red-700 p-1 rounded-lg mt-2 mb-2 disabled:opacity-25" 
                    disabled={buttonDisabled}>Register</button>
              </div>
        </div>
    )
}

export default RegisterForMission;