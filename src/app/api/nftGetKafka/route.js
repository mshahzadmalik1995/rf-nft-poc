import KafkaConfig from "../../../utils/config";
import { NextResponse } from "next/server";
import { dbConnect } from "@/utils/dbConn";
import Nft from "@/models/nft";

export async function GET(req, res) {
  try {
    console.log("Get invoked nftGetKafka");
    const kafkaConfig = new KafkaConfig("cd", "gd");
    // This would work as a callback method we have to invoke it only for the first time for registration.
    kafkaConfig.consume("my-topic-nft", async(value) => {

      console.log("my-topic-nft inside");
     // console.log(value)
        
        const nftData = JSON.parse(value)

        console.log("nftData", nftData);
        
        await dbConnect();
        await Nft.create(nftData);
      // This would get invoked once new message gets added to the topic
      console.log("📨 Receive message: ", value);
      console.log("at nftgetKafka end")
    });

    return NextResponse.json(
      { message: "Mess posted succesfully " },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json(
      {
        message: `Server error while getting mission ${e}`,
      },
      { status: 500 }
    );
  }
}

// const constrollers = { sendMessageToKafka };

// export default constrollers;
