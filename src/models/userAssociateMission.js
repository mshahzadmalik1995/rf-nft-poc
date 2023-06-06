import mongoose from 'mongoose';

const userAssociateMissionSchema = new mongoose.Schema(
    {
        userId:{
            type:String,
            required: true
        },
        missionId:{
            type:String,
            required: true,
        },
        missionCode: {
            type:String,
            required:true
        },
        missionName:{
            type:String,
            required: true
        },
        missionDescription: {
            type:String,
            required:true
        },
        missionCompleted: {
            type:Boolean,
            required:true
        },
        cryptoAddress:{
            type:String,
            required:true,
        },
        missionCheckList:[
            {
                id:Number,
                task:String,
                status:Boolean
            }
        ]

    },{
        timestamps: true,
    }
);

const UserAssociateMission = mongoose.models.UserAssociateMission || mongoose.model('UserAssociateMission', userAssociateMissionSchema);

export default UserAssociateMission;