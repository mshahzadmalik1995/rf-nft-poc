
import { useRouter } from 'next/navigation';

const MissionCard = ({props}) => {
    //const {name, missionName, description, backgroundImage, tokenImage, tokenDescription} = props;

    const router = useRouter();
    const {_id, missionName, missionDescription, missionDetails, missionImageName } = props;

    const buttonSubmit = (e) => {
        e.preventDefault();
        router.push(`/components/viewmission/${_id}`)
    }
    return(
        <div className="flex flex-col p-2 mt-2">
            <h1 className="text-lg text-red-500 ">{missionName}</h1>
            <div className="relative w-96 h-50 p-1 mt-1">
                <div className="absolute inset-0 rounded-lg">
                    <img
                        src={`/${missionImageName}`}
                        alt="background image"
                        className="w-96 h-50 rounded-lg"
                    />
                </div>
                <div className="relative z-10 flex flex-col items-center justify-center w-80 h-40 ">
                    <h1 className='text-lg font-bold text-white  break-word'>{missionDescription}</h1>
                    <p className='mt-4 text-sm text-white  break-word'>{missionDetails.substring(0, 40)}</p>
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