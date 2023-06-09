import { dbConnect } from "@/utils/dbConn";
import { NextResponse } from "next/server";
import UserAssociateMission from "@/models/userAssociateMission";

export async function POST(req, res) {
    try{
        const body = await req.json();
        const {searchParams} = new URL(req.url);
        const userId = searchParams.get("userId");
        const missionId = searchParams.get("missionId");
        console.log(`userId ${userId}`);
       console.log(`missionId ${missionId}`)
        let searchCriteria = {
            userId: userId,
            missionId: missionId
        };
        await dbConnect();
       /* await UserAssociateMission.findOneAndUpdate(
            searchCriteria,
            { missionCheckList: body },
            {new : true},
            (error, updateDocument) => {
                if(error) {
                    return NextResponse.json({
                        message: `Server error while updating checklist userassociatiemission saving ${e}`
                    }, {status: 500})
                } else {
                    return NextResponse.json({ message:"data in userassociatemission update successfully!" },{ status: 200 })
                }
            }
        ); */
      /* await UserAssociateMission.findOneAndUpdate(
            searchCriteria,
            { missionCheckList: body },
            {new : true}
        );*/
        await UserAssociateMission.findOneAndUpdate(
             searchCriteria,
             { missionCheckList: body.missionCheckList },
             {new : true}
         );
        //console.log(body)
        //console.log(body.missionCheckList);
        return NextResponse.json({ message:"data in userassociatemission update successfully!" },{ status: 200 })

    } catch(e) {
        return NextResponse.json({
            message: `Server error while updating checklist userassociatiemission saving ${e}`
        }, {status: 500})
    }
}