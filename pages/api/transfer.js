const { ethers } = require('hardhat');
import { dbConnect, parseObjectId } from "@/utils/dbConn";
import UserAssociateMission from "@/models/userAssociateMission";
import Nft from "@/models/nft";
import User from "@/models/user";
const schedule = require("node-schedule");

export default async function transfer(req, res) {
    console.log("inside transfer Nft");
    await getUserAssociateMissionData(req, res);
    console.log("ending transfer Nft");
}

async function getUserAssociateMissionData(req, res) {
    try {
        const { userId, missionId } = req.body;

        let searchCriteria = {
            userId: userId,
            missionId: missionId
        };

        console.log(searchCriteria)

        const dconnect = await dbConnect();
        const userAssociateMissionData = await UserAssociateMission.findOne(searchCriteria);

        if (userAssociateMissionData) {
            const missionCode = userAssociateMissionData.missionCode;
            const cryptoAddress = userAssociateMissionData.cryptoAddress;
            const username = userAssociateMissionData.fullName;
            const tokenId = userAssociateMissionData.tokenId;
            const contractAddress = userAssociateMissionData.nftAddress;

            if (userAssociateMissionData.missionCompleted) {
                transferNFT(contractAddress, cryptoAddress, tokenId, userAssociateMissionData.missionId, userAssociateMissionData.userId, res);
            } else {
                return res.status(500).json(`Mission completion status pending`);
            }

        } else {
            return res.status(500).json(`No records found`);
        }
    } catch (e) {
        return res.status(500).json(`Server error while fetching user associated misssions ${e}`);
    }
}

async function transferNFT(contractAddress, cryptoAddress, tokenId, missionId, userId, res) {
    const ownerAddress = process.env.OWNER_ADDRESS;
    const contractInstance = await ethers.getContractAt("GenericNft", contractAddress);

    try {

        const overrides = {
            gasLimit: ethers.BigNumber.from(1500000)
        };

        //transferring the NFT from owner's wallet to user's wallet
        const transferTransaction = await contractInstance.transferFrom(ownerAddress, cryptoAddress, tokenId, overrides);
        await transferTransaction.wait(1);

        updateNftDetails(missionId, userId);
        return res.status(200).json(`Nft transfer complete`);
    } catch (e) {
        return res.status(500).json(`Server error while claiming NFT ${e}`);
    }
}

async function updateNftDetails(missionId, userId) {

    let searchCriteria = {
        userId: userId,
        missionId: missionId
    };

    const userMission = await UserAssociateMission.findOneAndUpdate(
        searchCriteria,
        { isNFTRewarded: true },
        { new: true }
    );
    const user = await User.findByIdAndUpdate({
        _id: parseObjectId(userId), isShowReward: { $ne: true }
    }, {
        isShowReward: true
    }, { new: true })
}