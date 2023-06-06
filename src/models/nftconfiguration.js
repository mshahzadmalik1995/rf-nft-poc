import mongoose from 'mongoose';

const nftConfigurationSchema = new mongoose.Schema(
    {
        missionId: {
            type:String,
            required:true
        },
        imageName: {
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

const NftConfiguration = mongoose.models.NftConfiguration || mongoose.model("NftConfiguration", nftConfigurationSchema);

export default NftConfiguration;