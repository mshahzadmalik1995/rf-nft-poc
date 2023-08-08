import {dbConnect} from "@/utils/dbConn";
import { NextResponse } from "next/server";
import UserAssociateMission from "@/models/userAssociateMission";

export async function POST(req, res) {
    try{
        const body = await req.json();
        await dbConnect();
        console.log(body)
        console.log(body.missionCheckList)
        await UserAssociateMission.create(body);
        return NextResponse.json({
            message: "user associate mission saved successfully"
        }, {
            status: 200
        });

    } catch(e) {
        return NextResponse.json({
            message: `Server error while user associati mission saving ${e}`
        }, {status: 500})

    }
}