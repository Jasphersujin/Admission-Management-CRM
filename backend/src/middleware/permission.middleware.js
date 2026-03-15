import RolePermission from "../models/rolepermission.model.js";
import Screen from "../models/screen.model.js";
import Action from "../models/action.model.js";

export const checkPermission = (screenCode, actionCode) => {

  return async (req, res, next) => {

    try {

      const roleId = req.user.roleId;

      const screen = await Screen.findOne({ code: screenCode });

      if (!screen) {
        return res.status(404).json({
          message: "Screen not found"
        });
      }

      const action = await Action.findOne({ code: actionCode });

      if (!action) {
        return res.status(404).json({
          message: "Action not found"
        });
      }

      const permission = await RolePermission.findOne({
        roleId: roleId,
        screenId: screen._id,
        actions: action._id
      });

      if (!permission) {
        return res.status(403).json({
          message: "Access denied"
        });
      }

      next();

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  };

};