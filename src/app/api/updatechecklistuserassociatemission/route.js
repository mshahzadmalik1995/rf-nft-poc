import { dbConnect } from "@/utils/dbConn";
import { NextResponse } from "next/server";
import UserAssociateMission from "@/models/userAssociateMission";

export async function POST(req, res) {
    try{
        const body = await req.json();
       console.log(body);
        //const {totalMissionChecklistCount, missionChecklistCountComplete, missionCompleted, missionCheckList} = body;
        const userAssctMisId = body.userasctmisid;
        const chcklstId = body.checklistid;
        console.log("userAssctMisId:", userAssctMisId);
        console.log("chcklstId:", chcklstId);
        //const completeStatus = (totalComplete === totalMissionChecklistCount);

        // const searchParams = new URL(req.url);
        // const userAssctMisId = searchParams.get("userasctmisid");
        // const chcklstId = searchParams.get("checklistid");
        let searchCriteria = {
            _id: userAssctMisId
        };
        console.log("searchCriteria:",searchCriteria);
        await dbConnect();
        var record = await UserAssociateMission.find(
            searchCriteria);
        
        console.log("query result:", record)
        //var chklist = new Array();
        var chklist = record[0].missionCheckList;
        console.log("chklist array:", chklist)
        var checklistIndex;
        // chklist[0].forEach((chk, index) => {
        //     if(chk._id == chcklstId){
        //         checklistIndex = index;
        //     }
        // });

        chklist.forEach((chk, index) => {
            if(chk._id == chcklstId){
                checklistIndex = index;
                chklist[index].status = true;
            }   
        });
        console.log("checklistIndex:", checklistIndex)

        let updateValue = {
            missionCheckList : chklist
        }
        console.log("updateValue:", updateValue);
        const updateChklist = await UserAssociateMission.findOneAndUpdate(
            searchCriteria, 
            updateValue, 
            {new : true}
        )
        
        console.log("updateChklist:", updateChklist)
            // const userMission = await UserAssociateMission.findOneAndUpdate(
            //     searchCriteria,
            //     { missionCheckList: missionCheckList, totalMissionChecklistCount: totalMissionChecklistCount, missionCompleted: completeStatus, missionChecklistCountComplete: totalComplete },
            //     {new : true}
        
       // console.log(returnData);
        return NextResponse.json({updateChklist  },{ status: 200 })

    } catch(e) {
        return NextResponse.json({
            message: `Server error while updating checklist userassociatiemission saving ${e}`
        }, {status: 500})
    }
}