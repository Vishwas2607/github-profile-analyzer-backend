import express from "express";
import { analyzeProfileController, getAllProfilesController, getProfileByIdController } from "../controllers/profiles.controller.js";

const profileRouter = express.Router();

profileRouter.get("/", getAllProfilesController);
profileRouter.get("/analyze/:username", analyzeProfileController);
profileRouter.get("/:id", getProfileByIdController);

export default profileRouter;