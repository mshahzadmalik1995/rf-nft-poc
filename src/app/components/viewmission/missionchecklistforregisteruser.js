"use client";
import {MdOutlineLocationOn} from 'react-icons/md';
import {GiCheckeredFlag} from 'react-icons/gi'
import {useEffect, useState} from 'react';
const MissionCheckListForRegisterUser = ({value, handleCheckboxChange}) => {
    //const {id, status, task} = value;
    const {_id, name, status, completeStatus} = value;
   // console.log("id, status, task",id, status, task);
    //const [color, setColor] = useState(status);
    const [color, setColor] = useState(completeStatus);
    const checkBoxChange = (e) => {
        handleCheckboxChange(e,_id);
    }

    useEffect(() => {
      setColor(completeStatus)
    }, [completeStatus])
    
    return(
        <div className="flex flex-1 box-border items-center  gap-2">
            <MdOutlineLocationOn  size="1rem" color={color ? "green" : "red"}/>
            <input type="checkbox"  onChange={checkBoxChange} disabled={completeStatus}/>
            <div className='flex-1 box-border'>
                <p className="text-[12px] break-words">{name}</p>
            </div>
        </div>
    ) 
}

export default MissionCheckListForRegisterUser;