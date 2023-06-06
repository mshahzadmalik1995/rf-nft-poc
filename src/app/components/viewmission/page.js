
"use client";

import {MdOutlineLocationOn} from 'react-icons/md';
import {GiCheckeredFlag} from 'react-icons/gi'
import { useState } from "react";

const ViewMission = () => {

    const [buttonDisabled, setButtonDisabled] = useState(true);
  const [isCheck, setIsCheck] = useState(false);


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
                        The 19th edition of the Royal Enfield Himalayan odyssey will be flagged
                        off from India Gate on July 14th, 2023. We're calling out to all those who
                        would love to ride on on an exciting terrain while navigating through empty
                        stretches of pristine landscape, rock strewn pathways and traversing the highest
                        mountain passes to join this one of a kind ride.
                    </p>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-normal gap-2">
                        <MdOutlineLocationOn  size="1rem" color="red"/>
                        <input type="checkbox"/>
                        <div>
                            <p className="text-[12px] break-words">Register for the Himalayan Odyssey 2023</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-normal gap-2">
                        <MdOutlineLocationOn  size="1rem" color="red"/>
                        <input type="checkbox"/>
                        <div>
                            <p className="text-[12px] break-words">Click and upload your picture atop the Baralacha la</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-normal gap-2">
                        <MdOutlineLocationOn  size="1rem" color="red"/>
                        <input type="checkbox"/>
                        <div>
                            <p className="text-[12px] break-words">Reach for the layover at Sarchu campsite</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-normal gap-2">
                        <MdOutlineLocationOn  size="1rem" color="red"/>
                        <input type="checkbox"/>
                        <div>
                            <p className="text-[12px] break-words">Reach the pinnacle of your adventure at Umling la</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-normal gap-2">
                        <MdOutlineLocationOn  size="1rem" color="red"/>
                        <input type="checkbox"/>
                        <div>
                            <p className="text-[12px] break-words">Visit the Buddhist monastery at Kaza</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-normal gap-2">
                        <GiCheckeredFlag size="1rem"/>
                        <input type="checkbox"/>
                        <div>
                            <p className="text-[12px] break-words">Complete the adventure at Chandigarh</p>
                        </div>
                    </div>
                </div>
                <button className="w-72 text-white bg-red-700 p-1 rounded-lg mt-4 mb-2 " 
                    >Register</button>
              </div>
        </div>
    )
}

export default ViewMission;