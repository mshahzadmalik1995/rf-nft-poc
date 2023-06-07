import {dbConnect, parseObjectId} from "@/utils/dbConn";
import Mission from "@/models/mission";
import { NextResponse } from "next/server";

export async function GET(req, res) {
    try{
        
        const {searchParams} = new URL(req.url);
        const missionId = searchParams.get("missionId");
        let mission;
        await dbConnect();
        if(missionId === null) {
            mission = await Mission.find();
        } else {
            mission = await Mission.findOne({_id: parseObjectId(missionId)});
        }
        if(mission) {
            return NextResponse.json({mission}, {status: 200});
        } else {
            return NextResponse.json({message:"No data found"}, {status: 404});
        } 
    } catch (e) {
        return NextResponse.json({
            message: `Server error while getting mission ${e}`
        }, {status: 500})
    }
}