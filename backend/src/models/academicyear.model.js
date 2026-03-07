import mongoose from "mongoose";

const academicyearSchema = new mongoose.Schema(
    {
        year : {
            type : String,
            required : true,
            unique : true,
            match: /^\d{4}-\d{4}$/
        },
        startDate : {
            type : Date,
            required : true,
        },
        endDate : {
            type : Date,
            required : true
        },
        isActive : {
            type : Boolean,
            default : false
        },
    },
    {
        timestamps : true
    }
)

const AcademicYear = mongoose.model("AcademicYear", academicyearSchema);

export default AcademicYear;