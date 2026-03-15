import RolePermission from "../models/rolepermission.model.js";


// ASSIGN PERMISSION
export const assignRolePermission = async (req, res) => {

  try {

    const permission = await RolePermission.create(req.body);

    res.status(201).json({
      success: true,
      data: permission
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


// GET ALL
export const getAllPermissions = async (req, res) => {

  try {

    const permissions = await RolePermission
      .find()
      .populate("roleId")
      .populate("screenId")
      .populate("actions");

    res.json({
      success: true,
      data: permissions
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


// DELETE
export const deletePermission = async (req, res) => {

  try {

    await RolePermission.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Permission removed"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

}; 