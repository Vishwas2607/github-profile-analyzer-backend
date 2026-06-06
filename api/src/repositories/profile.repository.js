import {pool} from "../../../config/db.js";

export const createProfile = (profile) => {
  const query = `
    INSERT INTO github_profiles
    (
      github_id,
      username,
      name,
      bio,
      followers,
      following,
      public_repos,
      public_gists,
      account_age_days,
      profile_url,
      avatar_url
    )
    VALUES (?,?,?,?,?,?,?,?,?,?,?)
    
    ON DUPLICATE KEY UPDATE
      username         = VALUES(username),
      name             = VALUES(name),
      bio              = VALUES(bio),
      followers        = VALUES(followers),
      following        = VALUES(following),
      public_repos     = VALUES(public_repos),
      public_gists     = VALUES(public_gists),
      account_age_days = VALUES(account_age_days),
      profile_url      = VALUES(profile_url),
      avatar_url       = VALUES(avatar_url)
  `;

  const values = [
    profile.github_id,
    profile.username,
    profile.name,
    profile.bio,
    profile.followers,
    profile.following,
    profile.public_repos,
    profile.public_gists,
    profile.account_age_days,
    profile.profile_url,
    profile.avatar_url,
  ];

  return pool.execute(query, values);
};

export const getAllProfilesFromDB = () => {
  return pool.execute(
    "SELECT * FROM github_profiles ORDER BY created_at DESC"
  );
};

export const getProfileByIdFromDB = (id) => {
  return pool.execute("SELECT * FROM github_profiles WHERE id = ?", [id]);
}
