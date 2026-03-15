import Action from "../models/action.model.js";


// CREATE
export const createAction = async (req, res) => {

  try {

    const action = await Action.create(req.body);

    res.status(201).json({
      success: true,
      data: action
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


// GET ALL
export const getAllActions = async (req, res) => {

  try {

    const actions = await Action.find();

    res.json({
      success: true,
      data: actions
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


// DELETE
export const deleteAction = async (req, res) => {

  try {

    await Action.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Action deleted"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};