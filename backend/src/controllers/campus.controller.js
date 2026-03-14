import Campus from "../models/campus.model.js";


/*
Create Campus
*/
export const createCampus = async (req, res) => {

  try {

    const { institutionId, name, location } = req.body;

    const campus = await Campus.create({
      institutionId,
      name,
      location
    });

    res.status(201).json({
      success: true,
      data: campus
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



/*
Get All Campus
*/
export const getCampuses = async (req, res) => {

  try {

    const campuses = await Campus.find()
      .populate("institutionId", "name code")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: campuses
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

/*
Get Campuses By Institution ID
*/
export const getCampusesByInstitution = async (req, res) => {

  try {

    const { institutionId } = req.params;

    const campuses = await Campus.find({
      institutionId: institutionId
    })
      .populate("institutionId", "name code")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: campuses.length,
      data: campuses
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


/*
Get Campus By ID
*/
export const getCampusById = async (req, res) => {

  try {

    const campus = await Campus.findById(req.params.id)
      .populate("institutionId", "name code");

    if (!campus) {
      return res.status(404).json({
        message: "Campus not found"
      });
    }

    res.json(campus);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};



/*
Update Campus
*/
export const updateCampus = async (req, res) => {

  try {

    const campus = await Campus.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: "after" }
    );

    res.json(campus);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};



/*
Delete Campus
*/
export const deleteCampus = async (req, res) => {

  try {

    await Campus.findByIdAndDelete(req.params.id);

    res.json({
      message: "Campus deleted"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};