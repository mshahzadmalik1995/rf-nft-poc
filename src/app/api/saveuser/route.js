import dbConnect from "@/utils/dbConn";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req, res) {
    try{
        const body = await req.json();
        await dbConnect();
        await User.create(body);
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
