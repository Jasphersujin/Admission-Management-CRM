// import SidebarSection from "../models/sidebarsection.model.js";
// import Feature from "../models/feature.model.js";
// import Screen from "../models/screen.model.js";
// import RolePermission from "../models/rolepermission.model.js";

// export const getSidebar = async (req, res) => {

//   try {

//     const roleId = req.user.roleId;

//     const permissions = await RolePermission.find({ roleId })
//       .populate("screenId");

//     const allowedScreenIds = permissions.map(p => p.screenId._id);

//     const screens = await Screen.find({
//       _id: { $in: allowedScreenIds }
//     }).populate("featureId");

//     const features = await Feature.find({
//       _id: { $in: screens.map(s => s.featureId._id) }
//     }).populate("sectionId");

//     const sections = await SidebarSection.find();

//     const sidebar = sections.map(section => {

//       const sectionFeatures = features
//         .filter(f => f.sectionId._id.toString() === section._id.toString())
//         .map(feature => {

//           const defaultScreen = screens.find(
//             s =>
//               s.featureId._id.toString() === feature._id.toString() &&
//               s.isDefault
//           );

//           if (!defaultScreen) return null;

//           return {
//             name: feature.name,
//             route: defaultScreen.route
//           };

//         })
//         .filter(Boolean);

//       return {
//         name: section.name,
//         icon: section.icon,
//         features: sectionFeatures
//       };

//     });

//     res.json({
//       success: true,
//       data: sidebar
//     });

//   } catch (error) {

//     res.status(500).json({
//       message: error.message
//     });

//   }

// };

import SidebarSection from "../models/sidebarsection.model.js";
import Feature from "../models/feature.model.js";
import Screen from "../models/screen.model.js";
import RolePermission from "../models/rolepermission.model.js";

export const getSidebar = async (req, res) => {
  try {

    const roleId = req.user.roleId;

    const permissions = await RolePermission
      .find({ roleId })
      .populate({
        path: "screenId",
        populate: {
          path: "featureId",
          populate: {
            path: "sectionId"
          }
        }
      });

    // Allowed screens
    const allowedScreens = permissions
      .map(p => p.screenId)
      .filter(s => s && s.isDefault);

    const sections = await SidebarSection
      .find({ isActive: true })
      .sort({ order: 1 });

    const sidebar = sections.map(section => {

      const features = allowedScreens
        .filter(screen =>
          screen.featureId.sectionId &&
          screen.featureId.sectionId._id.toString() === section._id.toString()
        )
        .map(screen => ({
          name: screen.featureId.name,
          route: screen.route
        }));

      return {
        name: section.name,
        icon: section.icon,
        features
      };

    });

    res.json({
      success: true,
      data: sidebar
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};