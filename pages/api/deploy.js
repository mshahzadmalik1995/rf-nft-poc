const { ethers } = require('hardhat');
import { dbConnect } from "@/utils/dbConn";
import UserAssociateMission from "@/models/userAssociateMission";
import Nft from "@/models/nft";
const schedule = require("node-schedule");

export default async function transferNFT(req, res) {
    schedule.scheduleJob("*/1 * * * *", async () => {
        console.log("Executing task at:", new Date());
        await getUserAssociateMissionData(req, res);
        console.log("Execution Completed at:", new Date());
    });
}

async function getUserAssociateMissionData(req, res) {
    try {
        const dconnect = await dbConnect();
        const userAssociateMissionData = await UserAssociateMission.find();

        if (userAssociateMissionData) {
            for (let i = 0; i < userAssociateMissionData.length; i++) {

                const missionCode = userAssociateMissionData[i].missionCode;
                const cryptoAddress = userAssociateMissionData[i].cryptoAddress;
                const username = userAssociateMissionData[i].fullName;

                if (userAssociateMissionData[i].missionCompleted) {
                    if (userAssociateMissionData[i].tokenId == null) {
                        const nft = await Nft.findOne({ missionId: userAssociateMissionData[i].missionId });
                        mintNFT(nft.nftAddress, cryptoAddress, userAssociateMissionData[i].missionId, userAssociateMissionData[i].userId, res);
                    } else {
                        console.log('NFT already rewarded to the user :', username);
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

        const overrides = {
            gasLimit: ethers.BigNumber.from(1500000)
        };

        //transferring the NFT from owner's wallet to user's wallet
        const transferTransaction = await contractInstance.transferFrom(ownerAddress, cryptoAddress, tokenId, overrides);
        await transferTransaction.wait(1);
        console.log('NFT transferred successfully to user with wallet address: ', contractAddress);
        console.log('Token Id of the NFT: ', tokenId)

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
}