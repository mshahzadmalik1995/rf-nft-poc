import {dbConnect, parseObjectId} from "@/utils/dbConn";
import Mission from "@/models/mission";
import { NextResponse } from "next/server";
import Nft from "@/models/nft";

export async function POST(req, rest) {
    try{
        const body = await req.json();
        await dbConnect();
        const mission = await Mission.create(body);
        console.log("mission", mission)
        const nft = await Nft.findByIdAndUpdate({_id:parseObjectId(body.nftId)}, {missionId: mission._id.toString(), isAssociated:true}, {new:true})
        console.log("nft", nft)
        return NextResponse.json({
            message: "data saved successfully!"
        }, {
            status: 200
        })
    } catch(e) {
        return NextResponse.json({
            message: `Server error while user saving ${e}`
        }, {status: 500})

    }
}