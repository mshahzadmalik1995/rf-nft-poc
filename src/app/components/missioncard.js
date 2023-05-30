const MissionCard = ({props}) => {
    const {name, missionName, description, backgroundImage, tokenImage, tokenDescription} = props;

    return(
        <div className="flex flex-col p-2 mt-2">
            <h1 className="text-lg text-red-500 ">{name}</h1>
            <div className="relative w-96 h-50 p-1 mt-1">
                <div className="absolute inset-0 rounded-lg">
                    <img
                        src={backgroundImage}
                        alt="background image"
                        className="w-96 h-50 rounded-lg"
                    />
                </div>
                <div className="relative z-10 flex flex-col items-center justify-center w-80 h-40 ">
                    <h1 className='text-lg font-bold text-white  break-word'>{missionName}</h1>
                    <p className='mt-4 text-sm text-white  break-word'>{description}</p>
                </div>
                <div className="relative z-10 flex justify-between items-center">
                    <div className="flex gap-1 items-center">
                        <img src={tokenImage} alt="background image" className="w-10 h-10 rounded-full"/>
                        <p className="text-sm text-white">{tokenDescription}</p>
                    </div>
                    <div className="items-center">
                        <button className="bg-red-600 text-white text-sm cursor-pointer rounded-lg p-1">View Mission</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MissionCard;