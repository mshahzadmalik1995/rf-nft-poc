import mongoose from "mongoose";

const checklistSchema = new mongoose.Schema(
    {
        subscription: {
            type: String,
            required: true
        },
        tasks: [{
            task: String
        }]
    }, {
    timestamps: true,
}
)

const Checklist = mongoose.models.Checklist || mongoose.model("Checklist", checklistSchema);

export default Checklist;