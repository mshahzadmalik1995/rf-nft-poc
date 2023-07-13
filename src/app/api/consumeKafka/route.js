import KafkaConfig from "../../../utils/config";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    console.log("consume Kafka is invoked");
    const kafkaConfig = new KafkaConfig();
    // This would work as a callback method we have to invoke it only for the first time for registration.
    const {searchParams} = new URL(req.url);
    const topic_name = searchParams.get("topic");
    console.log(topic_name);
    kafkaConfig.consume(topic_name, async (value) => {
      // This would get invoked once new message gets added to the topic
      console.log("📨 Receive message on topic: ",topic_name , "with value" , value);
      var arr = value.split(",");
      var usrAsciatMisId = arr[0];
      var cheklstId = arr[2];
      console.log("usrAsciatMisId:", usrAsciatMisId, "cheklstId:", cheklstId);
      const bodyJson = {
            "userasctmisid" : usrAsciatMisId,
            "checklistid" : cheklstId
        }
        console.log("stringified body", JSON.stringify(bodyJson));
          const res = await fetch(`/api/updatechecklistuserassociatemission`, {
            method: 'POST',
            headers: { "Content_Type": "application/json" },
            body: bodyJson
          })
          console.log("res:", res);
          if(res.status === 200){
            console.log("checklist updated")
          }
          else{
            console.log("db updation failed")
          }
    });

    return NextResponse.json(
      { message: "Message on topic new-topic is received"},
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json(
      {
        message: `Server error while receiving message on topic new-topic ${e}`,
      },
      { status: 500 }
    );
  }
}

// const constrollers = { sendMessageToKafka };

// export default constrollers;
