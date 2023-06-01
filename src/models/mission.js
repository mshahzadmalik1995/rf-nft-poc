import mongoose from "mongoose";

const missionSchema = new mongoose.Schema(
    {
        missionName: {
            type:String,
            required: true
        },
        missionDescription: {
            type:String,
            required: true
        },
        missionDetails : {
            type: String,
            required: true,
        },
        subMissionList : {
            type: Array,
            required: true
        },
        startDate: {
            type:Date,
            required: true
        },
        endDate: {
            type: Date,
            required: true,
        },
        isValid: {
            type:Boolean,
            required: true
        }
    }, {
        timestamps: true,
})

const Mission = mongoose.models.Mission || mongoose.model('Mission', missionSchema);

export default Mission;