import mongoose from "mongoose";

const sidebarSectionSchema = new mongoose.Schema(
    {
        name : {
            type : String,
            required : true,
            trim : true,
        },
        icon :  {
            type : String,
            default : null,
        },
        order : {
            type : Number,
            default : 0,
        },
        isActive : {
            type : Boolean,
            default : true
        },
    },
    {
        timestamps : true
    }
)

const SidebarSection = mongoose.model("SidebarSection", sidebarSectionSchema);
export default SidebarSection;