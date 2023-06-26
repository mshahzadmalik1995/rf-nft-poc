import { dbConnect } from "@/utils/dbConn";
import { NextResponse } from "next/server";
import User from "@/models/user";

export async function POST(req, res) {
    try{
       // const body = await req.json();

        const {searchParams} = new URL(req.url);
        const userId = searchParams.get("userId");
        let searchCriteria = {
            _id: userId,
            isShowReward : {$ne: false}
        };
        await dbConnect();
        const userUpdate = await User.findOneAndUpdate(
            searchCriteria,
            { isShowReward: false},
            {new : true}
        );
        return NextResponse.json({messsage:"data updated successfully"  },{ status: 200 })

    } catch(e) {
        return NextResponse.json({
            message: `Server error while updating user data ${e}`
        }, {status: 500})
    }
}