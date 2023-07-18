import { dbConnect, parseObjectId } from "@/utils/dbConn";
import UserAssociateMission from "@/models/userAssociateMission";
import Nft from "@/models/nft";
import User from "@/models/user";
import KafkaConfig from "../../src/utils/config";

export default async function consumemintkafka(req, res) {
    try{
        console.log("Get invoked consumemintkafka"); 
        const kafkaConfig = new KafkaConfig("cddd", "gddd");

        kafkaConfig.consume("my-topic-nftData-consume", async(value) => {

            console.log("my-topic-nftData-consume inside");
           // console.log(value)
              
              const nftData = JSON.parse(value)
      
              console.log("nftData", nftData);
              
              await dbConnect();
              let searchCriteria = {
                userId: nftData.userId,
                missionId: nftData.missionId
            };
        
            const userMission = await UserAssociateMission.findOneAndUpdate(
                searchCriteria,
                { tokenId: nftData.tokenId, nftAddress: nftData.contractAddress },
                { new: true }
            );
            const user = await User.findByIdAndUpdate({
                _id: parseObjectId(nftData.userId), isShowReward:{$ne:true}
            },{
                isShowReward: true
            }, {new : true})
            // This would get invoked once new message gets added to the topic
            console.log("📨 Receive message: ", value);
            console.log("NFT rewarded successfully to the eligible customers`")
          });

          return res.status(200).json(`NFT rewarded successfully to the eligible customers`);

    }catch(e) {

    }
}