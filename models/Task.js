import mongoose from "mongoose";
const Schema = mongoose.Schema;

const taskSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        dueDate: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
            default: "pending",
        },
        assignedUser: {
           type: Array,   
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User", 
        }
    },{ timestamps: true }
)

const Task = mongoose.model("Task", taskSchema);

export default Task;