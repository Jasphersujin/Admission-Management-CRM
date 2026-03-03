import Institution from "../models/institution.model.js";


// Create Institution
export const createInstitution = async (req, res) => {
  try {
    const { name, code, email, phone, address } = req.body;

    const institution = await Institution.create({
      name,
      code,
      email,
      phone,
      address
    });

    res.status(201).json({
      success: true,
      data: institution
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



// Get All Institutions
export const getInstitutions = async (req, res) => {
  try {
    const institutions = await Institution.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: institutions
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



// Get Single Institution
export const getInstitutionById = async (req, res) => {
  try {
    const institution = await Institution.findById(req.params.id);

    if (!institution) {
      return res.status(404).json({
        message: "Institution not found"
      });
    }

    res.json(institution);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};



// Update
// export const updateInstitution = async (req, res) => {
//   try {
//     const institution = await Institution.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );

//     res.json(institution);

//   } catch (error) {
//     res.status(500).json({
//       message: error.message
//     });
//   }
// };

export const updateInstitution = async (req, res) => {
  try {
    const institution = await Institution.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: "after" } // ✅ updated option
    );

    res.json(institution);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};



// Delete
export const deleteInstitution = async (req, res) => {
  try {
    await Institution.findByIdAndDelete(req.params.id);

    res.json({
      message: "Institution deleted"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};