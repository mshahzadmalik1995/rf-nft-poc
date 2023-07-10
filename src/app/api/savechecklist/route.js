import { dbConnect } from "@/utils/dbConn";
import Checklist from "@/models/checklist";
import { NextResponse } from "next/server";

export async function POST(req, rest) {
    try {
        const body = await req.json();
        await dbConnect();
        await Checklist.create(body);
        return NextResponse.json({
            message: "Data saved successfully!"
        }, {
            status: 200
        })
    } catch (e) {
        return NextResponse.json({
            message: `Server error while user saving ${e}`
        }, { status: 500 })

    }
}