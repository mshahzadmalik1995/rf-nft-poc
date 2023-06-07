import {dbConnect} from "@/utils/dbConn";
import UserAssociateMission from "@/models/userAssociateMission";
import { NextResponse } from "next/server";

export async function GET(req, res) {
    try{
        const {searchParams} = new URL(req.url);
        const userId = searchParams.get("userId");
        const missionId = searchParams.get("missionId");
       // console.log(userId)
        //console.log(missionId)
        let searchCriteria;
        if(userId && missionId === null){
            console.log("hi userid")
            searchCriteria = {
                userId: userId
            }
        } else if(userId && missionId) {
            searchCriteria = {
                userId: userId,
                missionId: missionId
            }
        }
       // console.log(searchCriteria)
        await dbConnect();
        
        const userMission = await UserAssociateMission.find(searchCriteria)
        
         if(userMission) {
            return NextResponse.json({ userMission },{ status: 200 })
         } else {
            return NextResponse.json({ message: "no data found" },{ status: 404 })
         }


    }catch(e) {
        return NextResponse.json({
            message: `Server error while getting user associate mission ${e}`
        }, {status: 500})
    }
}