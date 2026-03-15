import Feature from "../models/feature.model.js";


// CREATE
export const createFeature = async (req, res) => {

  try {

    const feature = await Feature.create(req.body);

    res.status(201).json({
      success: true,
      data: feature
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


// GET ALL
export const getAllFeatures = async (req, res) => {

  try {

    const features = await Feature
      .find()
      .populate("sectionId")
      .sort({ order: 1 });

    res.json({
      success: true,
      data: features
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


// GET BY ID
export const getFeatureByID = async (req, res) => {

  try {

    const feature = await Feature.findById(req.params.id);

    res.json({
      success: true,
      data: feature
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


// UPDATE
export const updateFeature = async (req, res) => {

  try {

    const feature = await Feature.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      data: feature
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


// DELETE
export const deleteFeature = async (req, res) => {

  try {

    await Feature.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Feature deleted"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};