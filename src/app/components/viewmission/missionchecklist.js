"use client";
import {MdOutlineLocationOn} from 'react-icons/md';
import {GiCheckeredFlag} from 'react-icons/gi'
const MissionCheckList = ({props}) => {
    const {id, status, task} = props;

    return(
        <div className="flex items-center justify-normal gap-2">
            <MdOutlineLocationOn  size="1rem" color="red"/>
            <input type="checkbox"/>
            <div>
                <p className="text-[12px] break-words">{task}</p>
            </div>
        </div>
    )
}

export default MissionCheckList;