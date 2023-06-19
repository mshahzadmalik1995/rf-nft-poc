import {dbConnect} from "@/utils/dbConn";
import  Nft from "@/models/nft"
import { NextResponse } from "next/server";

export async function GET(req, res) {
    try{
        
        const {searchParams} = new URL(req.url);
        const missionId = searchParams.get("missionId");
        let searchCriteria;
        let nftData;
        await dbConnect();
        if(missionId ) {
            searchCriteria = {missionId: missionId}
            nftData = await Nft.findOne(searchCriteria);
        } else {
            searchCriteria = {isAssociated : false}
            nftData = await Nft.find(searchCriteria);
        }
        if(nftData) {
            return NextResponse.json({nftData}, {status: 200});
        } else {
            return NextResponse.json({message:"No data found"}, {status: 404});
        } 
    } catch (e) {
        return NextResponse.json({
            message: `Server error while getting mission ${e}`
        }, {status: 500})
    }
}