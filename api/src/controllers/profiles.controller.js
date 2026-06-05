import { analyzeProfile, getAllProfiles, getProfileById } from "../services/profiles.service.js";

export const analyzeProfileController = async (req,res,next) => {
    const {username} = req.params;

    const result = await analyzeProfile(username);

    return res.status(201).json({message: "Profile analyzed and saved successfully", data: result});
};

export const getAllProfilesController = async (req,res,next) => {
    const result = await getAllProfiles();

    return res.status(200).json({message: "Profiles retrieved successfully", data: result});
};

export const getProfileByIdController = async (req,res,next) => {
    const {id} = req.params;
    const result = await getProfileById(id);

    return res.status(200).json({message: "Profile retrieved successfully", data: result});
};