import KafkaConfig from "../../../utils/config";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    console.log("Get invoked");
    const kafkaConfig = new KafkaConfig();
    // This would work as a callback method we have to invoke it only for the first time for registration.
    kafkaConfig.consume("my-topic", (value) => {
      // This would get invoked once new message gets added to the topic
      console.log("📨 Receive message: ", value);
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
