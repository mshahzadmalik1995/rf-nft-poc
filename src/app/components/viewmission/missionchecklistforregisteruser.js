"use client";
import {MdOutlineLocationOn} from 'react-icons/md';
import {GiCheckeredFlag} from 'react-icons/gi'
import {useEffect, useState} from 'react';
const MissionCheckListForRegisterUser = ({value, handleCheckboxChange}) => {
    const {id, status, task} = value;
    console.log("id, status, task",id, status, task);
    const [color, setColor] = useState(status);
    const checkBoxChange = (e) => {
        handleCheckboxChange(e,id);
    }

   /* useEffect(() => {
      setColor(status)
    }, [status])*/
    
    return(
        <div className="flex flex-1 box-border items-center  gap-2">
            {console.log("colorvalue",color)}
            <MdOutlineLocationOn  size="1rem" color={color ? "green" : "red"}/>
            <input type="checkbox"  onChange={checkBoxChange}/>
            <div className='flex-1 box-border'>
                <p className="text-[12px] break-words">{task}</p>
            </div>
        </div>
    ) 
    /*return(
        <div className="flex flex-1 box-border items-center  gap-2">
            <MdOutlineLocationOn  size="1rem" color="red"/>
            <input type="checkbox"  onChange={checkBoxChange}/>
            <div className='flex-1 box-border'>
                <p className="text-[12px] break-words">{task}</p>
            </div>
        </div>
    )*/
}

export default MissionCheckListForRegisterUser;