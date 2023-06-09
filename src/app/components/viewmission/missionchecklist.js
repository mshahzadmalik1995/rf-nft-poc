"use client";
import {MdOutlineLocationOn} from 'react-icons/md';
import {GiCheckeredFlag} from 'react-icons/gi'
const MissionCheckList = ({props}) => {
    const {id, status, task} = props;

    return(
        <div className="flex-1 flex box-border items-center gap-2">
            <MdOutlineLocationOn  size="1rem" color="red"/>
            <div>
                <p className="text-[12px] break-words">{task}</p>
            </div>
        </div>
    )
}

export default MissionCheckList;