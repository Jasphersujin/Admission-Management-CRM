import Department from "../models/department.model.js";


// Create Department
export const createDepartment = async (req, res) => {

  try {

    const { campusId, name, code } = req.body;

    const department = await Department.create({
      campusId,
      name,
      code
    });

    res.status(201).json({
      success: true,
      data: department
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


// Get Departments
export const getDepartments = async (req, res) => {

  try {

    const departments = await Department.find()
      .populate({
        path: "campusId",
        populate: {
          path: "institutionId",
          select: "name"
        }
      })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: departments
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


// Get Single Department
export const getDepartmentById = async (req, res) => {

  try {

    const department = await Department.findById(req.params.id)
      .populate({
        path: "campusId",
        populate: {
          path: "institutionId",
          select: "name"
        }
      });

    if (!department) {
      return res.status(404).json({
        message: "Department not found"
      });
    }

    res.json(department);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


// Update Department
export const updateDepartment = async (req, res) => {

  try {

    const department = await Department.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: "after" }
    );

    res.json(department);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


// Delete Department
export const deleteDepartment = async (req, res) => {

  try {

    await Department.findByIdAndDelete(req.params.id);

    res.json({
      message: "Department deleted"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};