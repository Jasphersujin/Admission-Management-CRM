import Role from "../models/role.model.js";


// CREATE
export const createRole = async (req, res) => {

  try {

    const role = await Role.create(req.body);

    res.status(201).json({
      success: true,
      data: role
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


// GET ALL
export const getAllRoles = async (req, res) => {

  try {

    const roles = await Role.find();

    res.json({
      success: true,
      data: roles
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


// DELETE
export const deleteRole = async (req, res) => {

  try {

    await Role.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Role deleted"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};