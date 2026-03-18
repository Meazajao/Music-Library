CREATE DATABASE music_library;
USE music_library;

CREATE TABLE artists (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    genre VARCHAR(100),
    bio TEXT,
    play_count INT DEFAULT 0
);

INSERT INTO artists (name, genre, bio, play_count) VALUES
('Justin Bieber', 'Pop', 'Canadian pop singer.', 320),
('Joey Bada$$', 'Hip Hop', 'American rapper from Brooklyn.', 280),
('Drake', 'Hip Hop', 'Canadian rapper and singer.', 450),
('Bob Marley', 'Reggae', 'Jamaican reggae legend.', 300);

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);