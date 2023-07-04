import KafkaConfig from "../../../utils/config";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const body = await req.json();
    const { message } = body;
    const kafkaConfig = new KafkaConfig();
    const messages = [
      { key: "key1", value: message },
      { key: "key2", value: "message123" },
    ];
    kafkaConfig.produce("my-topic", messages);

    return NextResponse.json(
      { message: "Mess posted succesfully" },
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
