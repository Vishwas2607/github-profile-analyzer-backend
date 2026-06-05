CREATE TABLE IF NOT EXISTS github_profiles (
    id INT PRIMARY KEY AUTO_INCREMENT,

    github_id BIGINT NOT NULL UNIQUE,

    username VARCHAR(100) NOT NULL UNIQUE,
    name VARCHAR(255),

    bio TEXT,

    followers INT DEFAULT 0,
    following INT DEFAULT 0,

    public_repos INT DEFAULT 0,
    public_gists INT DEFAULT 0,

    account_age_days INT,

    profile_url VARCHAR(255),
    avatar_url VARCHAR(500),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP
);