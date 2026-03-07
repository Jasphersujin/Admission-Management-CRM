import AcademicYear from "../models/academicyear.model";


// Create
export const createAcademicYear = async (req, res) => {
    try {
        const { academicYear, startDate, endDate, isActive } = req.body;

        const academicyear = await AcademicYear.create({
            academicYear,
            startDate,
            endDate,
            isActive,
        })

        res.status(201).json({
            sucess : true,
            data : academicYear
        })

    } catch (error) {
        res.status(500).json({
        success: false,
        message: error.message
    });

    }
}

