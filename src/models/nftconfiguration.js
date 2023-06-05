import mongoose from 'mongoose';

const nftConfigurationSchema = new mongoose.Schema(
    {
        userId: {
            type:String,
            required:true
        },
        missionId: {
            type:String,
            required:true
        },
        contractAddress:{
            type:String,
            required:true
        },
        contractAbi: {
            type:[Object],
            required: true
        }

    }, {
    timestamps: true,
})