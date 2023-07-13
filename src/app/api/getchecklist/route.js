import { dbConnect, parseObjectId } from "@/utils/dbConn";
import Checklist from "@/models/checklist";
import { NextResponse } from "next/server";

export async function GET(req, res) {
    try {
        const { searchParams } = new URL(req.url);
        const checklistId = searchParams.get("checklistId");
        let checklist;
        await dbConnect();
        if (checklistId === null) {
            checklist = await Checklist.find();
        } else {
            checklist = await Checklist.findOne({ _id: parseObjectId(checklistId) });
        }
        if (checklist) {
            return NextResponse.json(checklist, { status: 200 });
        } else {
            return NextResponse.json({ message: "No data found" }, { status: 404 });
        }
    } catch (e) {
        return NextResponse.json({
            message: `Server error while getting mission ${e}`
        }, { status: 500 })
    }
}