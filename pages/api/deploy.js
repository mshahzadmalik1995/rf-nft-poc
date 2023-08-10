const { ethers } = require('hardhat');
import { dbConnect, parseObjectId } from "@/utils/dbConn";
import UserAssociateMission from "@/models/userAssociateMission";
import Nft from "@/models/nft";
import User from "@/models/user";
const schedule = require("node-schedule");

export default async function transferNFT(req, res) {
    console.log("insider transfer Nft");
    schedule.scheduleJob("*/1 * * * *", async () => {
        console.log("Executing task at:", new Date());
        await getUserAssociateMissionData(req, res);
        console.log("Execution Completed at:", new Date());
    });

   // await getUserAssociateMissionData(req, res);
}

async function getUserAssociateMissionData(req, res) {
    try {
        const dconnect = await dbConnect();
        const userAssociateMissionData = await UserAssociateMission.find();

        if (userAssociateMissionData) {
            for (let i = 0; i < userAssociateMissionData.length; i++) {

                const cryptoAddress = userAssociateMissionData[i].cryptoAddress;
                const username = userAssociateMissionData[i].fullName;

                if (userAssociateMissionData[i].missionCompleted) {
                    if (userAssociateMissionData[i].tokenId == null) {
                        const nft = await Nft.findOne({ missionId: userAssociateMissionData[i].missionId });
                        if (nft.tokenCtr <= nft.rarity) {
                            await mintNFT(nft.nftAddress, cryptoAddress, userAssociateMissionData[i].missionId, userAssociateMissionData[i].userId, res);
                        } else {
                            console.log('NFT Rarity has been exceeded for the user :', username);
                        }
                    }
                }
            }
            //  return res.status(200).json(`NFT rewarded successfully to the eligible customers`);

        } else {
            return res.status(500).json(`No records found`);
        }
    } catch (e) {
        return res.status(500).json(`Server error while fetching user associated misssions ${e}`);
    }
}

async function mintNFT(contractAddress, cryptoAddress, missionId, userId, res) {
    const ownerAddress = process.env.OWNER_ADDRESS;
    const contractInstance = await ethers.getContractAt("GenericNft", contractAddress);


    try {
        //minting the NFT into owner's wallet
        const mintTransaction = await contractInstance.mintNft();
        await mintTransaction.wait(1);

        let tokenId = await contractInstance.getTokenCounter();
        tokenId = tokenId - 1;

        // const overrides = {
        //     gasLimit: ethers.BigNumber.from(1500000)
        // };

        //transferring the NFT from owner's wallet to user's wallet
        // const transferTransaction = await contractInstance.transferFrom(ownerAddress, cryptoAddress, tokenId, overrides);
        // await transferTransaction.wait(1);
        // console.log('NFT transferred successfully to user with wallet address: ', contractAddress);
        // console.log('Token Id of the NFT: ', tokenId)

        updateNftDetails(missionId, userId, tokenId, contractAddress);

    } catch (e) {
        return res.status(500).json(`Server error while claiming NFT ${e}`);
    }
}

async function updateNftDetails(missionId, userId, tokenId, contractAddress) {

    let searchCriteria = {
        userId: userId,
        missionId: missionId
    };

    const userMission = await UserAssociateMission.findOneAndUpdate(
        searchCriteria,
        { tokenId: tokenId, nftAddress: contractAddress },
        { new: true }
    );

    searchCriteria = {
        missionId: missionId
    };

    const nft = await Nft.findOneAndUpdate(searchCriteria,
        { tokenCtr: tokenId + 1 },
        { new: true });

    // const user = await User.findByIdAndUpdate({
    //     _id: parseObjectId(userId), isShowReward: { $ne: true }
    // }, {
    //     isShowReward: true
    // }, { new: true })
}