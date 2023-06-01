import dbConnect from "@/utils/dbConn";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET(req, res) {
    try{
       const {searchParams} = new URL(req.url);
        const uName = searchParams.get("username");
        const uPassword = searchParams.get("password")
        await dbConnect();
        const user = await User.findOne({username:uName, password: uPassword})
        
         if(user) {
            return NextResponse.json({ user },{ status: 200 })
         } else {
            return NextResponse.json({ message: "no data found" },{ status: 404 })
         }
    } catch(e) {
        return NextResponse.json({
            message: `Server error while user saving ${e}`
        }, {status: 500})
    }
}