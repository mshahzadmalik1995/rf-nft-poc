const { ethers } = require('hardhat');
import { dbConnect, parseObjectId } from "@/utils/dbConn";
import UserAssociateMission from "@/models/userAssociateMission";
import Nft from "@/models/nft";
import User from "@/models/user";
import KafkaConfig from "@/utils/config";
const schedule = require("node-schedule");

export default async function transferNFT(req, res) {
    console.log("insider transfer Nft");
    // schedule.scheduleJob("*/1 * * * *", async () => {
    //     console.log("Executing task at:", new Date());
    //     await getUserAssociateMissionData(req, res);
    //     console.log("Execution Completed at:", new Date());
    // });

    await getUserAssociateMissionData(req, res);
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
                            console.log("inside the mintproducerkafka.js")
                            const message = {
                                nftAddress: nft.nftAddress,
                                cryptoAddress: cryptoAddress,
                                missionId: userAssociateMissionData[i].missionId,
                                userId: userAssociateMissionData[i].userId
                            }
                            console.log(message);
                            const messageValue = JSON.stringify(message);
                            const kafkaConfig = new KafkaConfig("cdd", "gdd");
                            const messages = [
                              { key: "key1", value: messageValue },
                            ];
                            kafkaConfig.produce("my-topic-nft-mint-producer", messages);
                            console.log("hi publish kafka shahzad my-topic-nft-mint-producer")
                        } else {
                            console.log('NFT Rarity has been exceeded for the user :', username);
                        }
                    }
                }
            }
              return res.status(200).json(`NFT rewarded successfully to the eligible customers`);

        } else {
            return res.status(500).json(`No records found`);
        }
    } catch (e) {
        return res.status(500).json(`Server error while fetching user associated misssions ${e}`);
    }
}