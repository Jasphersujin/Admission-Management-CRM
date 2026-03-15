import SidebarSection from "../models/sidebarsection.model.js";


// Create Sidebar section
export const createSidebarSection = async (req, res) => {
    try {
        const { name, icon, order, isActive } = req.body;

        const sidebarsection = await SidebarSection.create({
            name,
            icon,
            order
        });

        res.status(201).json({
            success: true,
            data : sidebarsection,
        });
    } catch (error) {
        
        res.status(500).json({
            success: false,
            message : error.message,
        })
    }
} 

// Get ALL Sidebar

export const getAllSidebarSections = async (req, res) => {
    try {
        const sidebarsections = await SidebarSection.find();

        res.json({
            success : true,
            data : sidebarsections
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

// Get By ID
export const getSidebarSectionByID = async (req, res) => {

    try {
        const { id } = await req.params;
        const getSidebarSection = await SidebarSection.findById(id);

        if(!getSidebarSection){
            return res.status(500).json({
                success : false,
                message : "Sidebar section not found"
            })
        }

        return res.status(200).json(
            {
                success : true,
                data : getSidebarSection,
            }
        )
        
    } catch (error) {
        return res.status(500).json(
            {
                success : false,
                message : "Server error",
                error : error.message,
            }
        )
    }
}

// Update Sidebar Section
export const updateSidebarSection = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, icon, order, isActive } = req.body;

    const updatedSection = await SidebarSection.findByIdAndUpdate(
      id,
      {
        name,
        icon,
        order,
        isActive
      },
      { new: true, runValidators: true }
    );

    if (!updatedSection) {
      return res.status(404).json({
        success: false,
        message: "Sidebar section not found"
      });
    }

    res.status(200).json({
      success: true,
      data: updatedSection
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete Sidebar Section
export const deleteSidebarSection = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedSection = await SidebarSection.findByIdAndDelete(id);

    if (!deletedSection) {
      return res.status(404).json({
        success: false,
        message: "Sidebar section not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Sidebar section deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Toggle Sidebar Section Active Status
export const toggleSidebarSectionStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const section = await SidebarSection.findById(id);

    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Sidebar section not found"
      });
    }

    section.isActive = !section.isActive;
    await section.save();

    res.status(200).json({
      success: true,
      data: section
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};