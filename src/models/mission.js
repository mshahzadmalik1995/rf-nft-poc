import mongoose from "mongoose";

const missionSchema = new mongoose.Schema(
    {
        missionName: {
            type: String,
            required: true
        },
        missionCode: {
            type: String,
            required: true
        },
        missionDetails:{
            type:String,
            required:true
        },
        missionImageName:{
            type:String,
            required:true
        },
        missionDescription: {
            type: String,
            required: true
        },
        missionCheckList: {
            type: Array,
            required: true
        },
        isValid: {
            type: Boolean,
            required: true
        }
    }, {
    timestamps: true,
})

const Mission = mongoose.models.Mission || mongoose.model('Mission', missionSchema);

export default Mission;