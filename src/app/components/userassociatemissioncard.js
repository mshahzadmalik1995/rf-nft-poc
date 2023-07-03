"use client";
import { useRouter } from 'next/navigation';
import { useContext, useState, useEffect } from 'react';
import MyContext from "@/app/context/mycontext";
import { LinearProgress, makeStyles } from '@material-ui/core';

const UserAssociateMissionCard = ({ props }) => {
    //const {name, missionName, description, backgroundImage, tokenImage, tokenDescription} = props;


    const useStyles = makeStyles((theme) => ({
        progress: {
            backgroundColor: theme.palette.error.main,
        },
        bar: {
            backgroundColor: theme.palette.success.main,
        },
        completedBar: {
            backgroundColor: theme.palette.success.main,
        },
    }));

    const router = useRouter();
    const classes = useStyles();
    const { userLoginData } = useContext(MyContext);
    const { _id, missionId, missionCode, missionName, missionDescription, missionCheckList, missionImagePath, nftImagePath } = props;
    const [imageName, setImageName] = useState(null);
    const [progress, setProgress] = useState(null);
    const [nftData, setNftData] = useState();
    const [progressStatus, setProgressStatus] = useState(null);

    useEffect(() => {

        const calculateProgress = () => {
            let ctr = 0;
            for (let j = 0; j < missionCheckList.length; j++) {
                if (missionCheckList[j].status) {
                    ctr++;
                }
            }
            if (ctr == missionCheckList.length) {
                setProgressStatus('Mission');
            } else {
                setProgressStatus(ctr + ' of ' + missionCheckList.length);
            }
            setProgress(ctr / missionCheckList.length * 100);
        }
        calculateProgress();
    }, [])



    const buttonSubmit = (e) => {
        e.preventDefault();
        router.push(`/components/viewmission/${missionId}?missionCode=${missionCode}`)
    }
    return (
        <div className="flex flex-col p-2 mt-2">
            <h1 className="text-lg text-red-500 ">{`Mission ${missionCode}`}
                <span style={{ float: 'right', color: 'black' }}>{`${progressStatus} Completed`}</span>
            </h1>
            <div className="relative w-96 h-50 p-1 mt-1">
                <div className="absolute inset-0 rounded-lg">
                    <img
                        src={missionImagePath}
                        alt="background image"
                        className="w-96 max-h-64 rounded-lg"
                    />
                </div>
                <div className="relative z-10 flex flex-col items-start  w-80 h-40 mt-1 ml-4 ">
                    <h1 className='text-lg font-bold text-white  break-word'>{missionName}</h1>
                    <p className='mt-4 text-sm text-white  break-word'>{missionDescription.substring(0, 40)}</p>
                </div>
                <div className="relative z-10 flex justify-between items-center mb-2">
                    <div className="flex gap-1 items-center">
                        {nftImagePath && <img src={nftImagePath} alt="background image" className="w-10 h-10 rounded-full" />}
                        <p className="text-sm text-white">NFT Token Reward</p>
                    </div>
                    <div className="items-center">
                        <button className="bg-red-600 text-white text-sm cursor-pointer rounded-lg p-1"
                            onClick={buttonSubmit}>View Mission</button>
                    </div>
                </div>
                <LinearProgress
                    variant="determinate"
                    value={progress}
                    classes={{
                        root: classes.progress,
                        bar: progress === 100 ? classes.completedBar : classes.bar
                    }}
                />
            </div>
        </div>
    )
}

export default UserAssociateMissionCard;