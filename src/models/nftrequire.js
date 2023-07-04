//import mongoose from "mongoose";
const mongoose = require("mongoose");

const nftSchema = new mongoose.Schema(
    {
        nftName:{
            type:String,
            required:true
        },
        nftDescription:{
            type:String,
            required:true
        },
        nftImageName:{
            type:String,
            required: true
        },
        nftImagePath:{
            type:String,
            required:true
        },
        nftContractName:{
            type:String,
            required:true,
        },
        nftAddress:{
            type:String,
            required:true
        },
        nftAbi:{
            type:[Object],
            required: true
        },
        nftTokenUri:{
            type:String,
            required:true
        },
        missionId:{
            type:String,
        },
        isAssociated:{
            type:Boolean,
            required:true
        }
    },{
        timestamps: true,
    }
)

const Nft = mongoose.models.Nft || mongoose.model("Nft", nftSchema);

module.exports = {Nft};