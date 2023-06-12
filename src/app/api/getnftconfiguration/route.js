import {dbConnect} from "@/utils/dbConn";
import { NextResponse } from "next/server";
import NftConfiguration from "@/models/nftconfiguration";

export async function GET(req, res) {
    try{
        //const body = await req.json();
        const {searchParams} = new URL(req.url);
        const missionCode = searchParams.get("missionCode");
        const missionId = searchParams.get("missionId");
        let searchCriteria;
        if(missionCode && missionId === null){
            searchCriteria = {missionCode:missionCode};
        } else if(missionCode && missionId){
            searchCriteria = {missionCode:missionCode, missionId:missionId};
        }
        await dbConnect();
        //console.log(searchCriteria)
        const configuration = await NftConfiguration.findOne(searchCriteria);
      //  console.log(configuration)
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