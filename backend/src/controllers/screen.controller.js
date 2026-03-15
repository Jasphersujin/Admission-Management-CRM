import Screen from "../models/screen.model.js";


// CREATE SCREEN
export const createScreen = async (req, res) => {

  try {

    const { name, code, featureId, route, isDefault } = req.body;

    // Prevent duplicate screen code
    const existingCode = await Screen.findOne({ code });

    if (existingCode) {
      return res.status(400).json({
        success: false,
        message: "Screen code already exists"
      });
    }

    // Only one default screen per module
    if (isDefault) {

      const existingDefault = await Screen.findOne({
        featureId,
        isDefault: true
      });

      if (existingDefault) {
        return res.status(400).json({
          success: false,
          message: "Default screen already exists for this module"
        });
      }

    }

    const screen = await Screen.create({
      name,
      code,
      featureId,
      route,
      isDefault
    });

    res.status(201).json({
      success: true,
      data: screen
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



// GET ALL SCREENS
export const getAllScreens = async (req, res) => {

  try {

    const screens = await Screen
      .find()
      .populate("featureId")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: screens
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



// GET SCREEN BY ID
export const getScreenByID = async (req, res) => {

  try {

    const { id } = req.params;

    const screen = await Screen
      .findById(id)
      .populate("featureId");

    if (!screen) {
      return res.status(404).json({
        success: false,
        message: "Screen not found"
      });
    }

    res.status(200).json({
      success: true,
      data: screen
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



// UPDATE SCREEN
export const updateScreen = async (req, res) => {

  try {

    const { id } = req.params;
    const { name, code, featureId, route, isDefault } = req.body;

    const screen = await Screen.findById(id);

    if (!screen) {
      return res.status(404).json({
        success: false,
        message: "Screen not found"
      });
    }

    // Check unique code
    const duplicateCode = await Screen.findOne({
      code,
      _id: { $ne: id }
    });

    if (duplicateCode) {
      return res.status(400).json({
        success: false,
        message: "Screen code already exists"
      });
    }

    // Validate default screen rule
    if (isDefault) {

      const existingDefault = await Screen.findOne({
        featureId,
        isDefault: true,
        _id: { $ne: id }
      });

      if (existingDefault) {
        return res.status(400).json({
          success: false,
          message: "Another default screen already exists for this module"
        });
      }

    }

    screen.name = name ?? screen.name;
    screen.code = code ?? screen.code;
    screen.featureId = featureId ?? screen.featureId;
    screen.route = route ?? screen.route;
    screen.isDefault = isDefault ?? screen.isDefault;

    await screen.save();

    res.status(200).json({
      success: true,
      data: screen
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



// DELETE SCREEN
export const deleteScreen = async (req, res) => {

  try {

    const { id } = req.params;

    const screen = await Screen.findById(id);

    if (!screen) {
      return res.status(404).json({
        success: false,
        message: "Screen not found"
      });
    }

    await Screen.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Screen deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};