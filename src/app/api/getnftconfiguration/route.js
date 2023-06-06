import dbConnect from "@/utils/dbConn";
import { NextResponse } from "next/server";
import NftConfiguration from "@/models/nftconfiguration";

export async function GET(req, res) {
    try{
        //const body = await req.json();
        await dbConnect();
        const configuration = await NftConfiguration.find();
        return NextResponse.json({
            configuration
        }, {
            status: 200
        })
    } catch(e) {
        return NextResponse.json({
            message: `Server error while user saving ${e}`
        }, {status: 500})

    }
}