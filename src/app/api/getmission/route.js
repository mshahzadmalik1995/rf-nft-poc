import dbConnect from "@/utils/dbConn";
import Mission from "@/models/mission";
import { NextResponse } from "next/server";

export async function GET(req, res) {
    try{
        await dbConnect();
        const mission = await Mission.find();
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