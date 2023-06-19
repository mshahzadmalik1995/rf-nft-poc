import { dbConnect } from "@/utils/dbConn";
import { NextResponse } from "next/server";
import UserAssociateMission from "@/models/userAssociateMission";

export async function POST(req, res) {
    try {
        const body = await req.json();
        const { tokenId, nftAddress } = body;
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");
        const missionId = searchParams.get("missionId");

        let searchCriteria = {
            userId: userId,
            missionId: missionId
        };

        await dbConnect();

        const userMission = await UserAssociateMission.findOneAndUpdate(
            searchCriteria,
            { tokenId: tokenId, nftAddress: nftAddress },
            { new: true }
        );

        return NextResponse.json({ userMission }, { status: 200 })

    } catch (e) {
        return NextResponse.json({
            message: `Server error while updating nft details userassociatiemission saving ${e}`
        }, { status: 500 })
    }
}