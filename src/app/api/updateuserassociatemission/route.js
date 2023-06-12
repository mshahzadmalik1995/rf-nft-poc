import { dbConnect } from "@/utils/dbConn";
import { NextResponse } from "next/server";
import UserAssociateMission from "@/models/userAssociateMission";

export async function POST(req, res) {
    try{
        const body = await req.json();
        console.log(body);
        //const {totalMissionChecklistCount, missionChecklistCountComplete, missionCompleted, missionCheckList} = body;
        const {missionCheckList, totalMissionChecklistCount} = body;
        let totalComplete = 0;
        missionCheckList.forEach(item => {
            if(item.status){
                totalComplete++;
            }
        })
        const completeStatus = (totalComplete === totalMissionChecklistCount);

        const {searchParams} = new URL(req.url);
        const userId = searchParams.get("userId");
        const missionId = searchParams.get("missionId");
        let searchCriteria = {
            userId: userId,
            missionId: missionId
        };
        await dbConnect();
        const userMission = await UserAssociateMission.findOneAndUpdate(
            searchCriteria,
            { missionCheckList: missionCheckList, totalMissionChecklistCount: totalMissionChecklistCount, missionCompleted: completeStatus, missionChecklistCountComplete: totalComplete },
            {new : true}
        );
       // console.log(returnData);
        return NextResponse.json({userMission  },{ status: 200 })

    } catch(e) {
        return NextResponse.json({
            message: `Server error while updating checklist userassociatiemission saving ${e}`
        }, {status: 500})
    }
}