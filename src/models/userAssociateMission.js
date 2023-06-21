import mongoose from 'mongoose';

const userAssociateMissionSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        fullName: {
            type: String,
            required: true
        },
        emailId: {
            type: String,
            required: true,
        },
        contactNo: {
            type: String,
            required: true,
        },
        pinCode: {
            type: String,
            required: true
        },
        missionId: {
            type: String,
            required: true,
        },
        missionCode: {
            type: String,
            required: true
        },
        missionName: {
            type: String,
            required: true
        },
        missionDescription: {
            type: String,
            required: true
        },
        totalMissionChecklistCount: {
            type: Number,
            required: true
        },
        missionChecklistCountComplete: {
            type: Number,
            required: true
        },
        missionCompleted: {
            type: Boolean,
            required: true
        },
        cryptoAddress: {
            type: String,
            required: true,
        },
        tokenId: {
            type: Number,
            required: false,
        },
        nftAddress: {
            type: String,
            required: false,
        },
        missionCheckList: [
            {
                id: Number,
                task: String,
                status: Boolean
            }
        ],
        nftId:{
            type:String,
            required:true
        },
        missionImageName:{
            type:String,
            required:true
        },
        missionImagePath:{
            type:String,
            required:true
        },

    }, {
    timestamps: true,
}
);

const UserAssociateMission = mongoose.models.UserAssociateMission || mongoose.model('UserAssociateMission', userAssociateMissionSchema);

export default UserAssociateMission;