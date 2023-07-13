import KafkaConfig from "../../../utils/config";
import { NextResponse } from "next/server";
export async function POST(req, res) {
  try {
    const body = await req.json();
    const topic_name = body.topic;
    const msg = body.chklistId;
    const usrAstMisId = body.usrasctmisid;
    const kafkaConfig = new KafkaConfig();
    console.log("topic:", topic_name," userastmisid:", usrAstMisId," chklistid:", msg)
    const messages = [
      { key: "key1", value: usrAstMisId+",chklstId: ,"+msg }
    ];
    kafkaConfig.produce(topic_name, messages);
    return NextResponse.json(
      { message: "Mess coming from publishToKafka api is posted succesfully" },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json(
      {
        message: `Server error while posting message from publishToKafka api ${e}`,
      },
      { status: 500 }
    );
  }
}
