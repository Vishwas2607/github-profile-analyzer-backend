import axios from "axios";
import {createProfile, getAllProfilesFromDB, getProfileByIdFromDB} from "../repositories/profile.repository.js";
import { AppError } from "../utils/appError.js";

export const analyzeProfile = async (username) => {
  const {data} = await axios.get(`https://api.github.com/users/${username}`); 

  const accountAgeDays = Math.floor((new Date() - new Date(data.created_at).getTime()) / (1000 * 60 * 60 * 24));

  const profile = {
    github_id: data.id,
    username: data.login,
    name: data.name,
    bio: data.bio,
    followers: data.followers,
    following: data.following,
    public_repos: data.public_repos,
    public_gists: data.public_gists,
    account_age_days: accountAgeDays,
    profile_url: data.html_url,
    avatar_url: data.avatar_url,
  };

  await createProfile(profile);

  return profile;
}

export const getAllProfiles = async () => {
  const [rows] = await getAllProfilesFromDB();
  if(!rows || rows.length === 0) {
    throw new AppError("No saved profiles to show !", 400)
  };
  return rows;
}

export const getProfileById = async (id) => {
  const [rows] = await getProfileByIdFromDB(id);
  if(!rows || rows.length === 0) {
        throw new AppError("Profile not found !", 404);
    };
  return rows[0];
}