import { FlashAutoOutlined } from "@material-ui/icons";
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
        missionDescription: {
            type: String,
            required: true
        },
        missionCheckList: [
            {
                id: Number,
                task: String,
                status: Boolean
            }
        ],

        checkListCount: {
            type: Number,
            required: true
        },

        nftRewardCount: {
            type: Number,
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