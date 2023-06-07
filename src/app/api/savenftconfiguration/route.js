import {dbConnect} from "@/utils/dbConn";
import { NextResponse } from "next/server";
import NftConfiguration from "@/models/nftconfiguration";

export async function POST(req, res) {
    try{
        const body = await req.json();
        await dbConnect();
        await NftConfiguration.create(body);
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