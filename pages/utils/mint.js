const { ethers } = require("hardhat");
import { dbConnect, parseObjectId } from "@/utils/dbConn";
import UserAssociateMission from "@/models/userAssociateMission";
import Nft from "@/models/nft";
import User from "@/models/user";
const schedule = require("node-schedule");

export default async function transferNFT() {
  console.log("inside transferNFT");
  schedule.scheduleJob("*/1 * * * *", async () => {
    console.log("Executing task at:", new Date());
    await getUserAssociateMissionData();
    console.log("Execution Completed at:", new Date());
  });
}

async function getUserAssociateMissionData() {
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
            const nft = await Nft.findOne({
              missionId: userAssociateMissionData[i].missionId,
            });
            mintNFT(
              nft.nftAddress,
              cryptoAddress,
              userAssociateMissionData[i].missionId,
              userAssociateMissionData[i].userId
            );
          } else {
            console.log("NFT already rewarded to the user :", username);
          }
        }
      }
      //  return res.status(200).json(`NFT rewarded successfully to the eligible customers`);
    } else {
      console.log(`No records found`);
    }
  } catch (e) {
    console.log(`Server error while fetching user associated misssions ${e}`);
  }
}

async function mintNFT(contractAddress, cryptoAddress, missionId, userId) {
  const ownerAddress = process.env.OWNER_ADDRESS;
  const contractInstance = await ethers.getContractAt(
    "GenericNft",
    contractAddress
  );

  try {
    //minting the NFT into owner's wallet
    const mintTransaction = await contractInstance.mintNft();
    await mintTransaction.wait(1);

    let tokenId = await contractInstance.getTokenCounter();
    tokenId = tokenId - 1;

    const overrides = {
      gasLimit: ethers.BigNumber.from(1500000),
    };

    //transferring the NFT from owner's wallet to user's wallet
    const transferTransaction = await contractInstance.transferFrom(
      ownerAddress,
      cryptoAddress,
      tokenId,
      overrides
    );
    await transferTransaction.wait(1);
    console.log(
      "NFT transferred successfully to user with wallet address: ",
      contractAddress
    );
    console.log("Token Id of the NFT: ", tokenId);

    updateNftDetails(missionId, userId, tokenId, contractAddress);
  } catch (e) {
    console.log(`Server error while claiming NFT ${e}`);
  }
}

async function updateNftDetails(missionId, userId, tokenId, contractAddress) {
  let searchCriteria = {
    userId: userId,
    missionId: missionId,
  };

  const userMission = await UserAssociateMission.findOneAndUpdate(
    searchCriteria,
    { tokenId: tokenId, nftAddress: contractAddress },
    { new: true }
  );
  const user = await User.findByIdAndUpdate(
    {
      _id: parseObjectId(userId),
      isShowReward: { $ne: true },
    },
    {
      isShowReward: true,
    },
    { new: true }
  );
}
