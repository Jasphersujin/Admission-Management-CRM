import SidebarSection from "../models/sidebarsection.model.js";


// Create Sidebar section
export const createSidebarSection = async (req, res) => {
    try {
        const { name, icon, order } = req.body;

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