import { dbConnect } from "@/utils/dbConn";
import { NextResponse } from "next/server";
import UserAssociateMission from "@/models/userAssociateMission";

export async function GET(req, res) {
    try{
        
        const {searchParams} = new URL(req.url);
        const userId = searchParams.get("userId");
        let searchCriteria = {
            userId: userId
        }
        //let nftData;
        await dbConnect();
        const userData = await UserAssociateMission.find(searchCriteria).sort({updatedAt: -1}).limit(1);
        const userMissionData = userData[0];
        if(userMissionData) {
            return NextResponse.json({userMissionData}, {status: 200});
        } else {
            return NextResponse.json({message:"No data found"}, {status: 404});
        } 
    } catch (e) {
        return NextResponse.json({
            message: `Server error while getting mission ${e}`
        }, {status: 500})
    }
}