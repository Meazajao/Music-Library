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

INSERT INTO users (username, email, password) VALUES
('testuser', 'test@test.com', '123456');

CREATE TABLE albums (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    release_year INT,
    artist_id INT NOT NULL,
    FOREIGN KEY (artist_id) REFERENCES artists(id)
);

INSERT INTO albums (title, release_year, artist_id) VALUES
('Purpose', 2015, 1),
('B4.DA.$$', 2015, 2),
('Views', 2016, 3),
('Legend', 1984, 4);

CREATE TABLE songs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    duration INT,
    album_id INT NOT NULL,
    artist_id INT NOT NULL,
    FOREIGN KEY (album_id) REFERENCES albums(id),
    FOREIGN KEY (artist_id) REFERENCES artists(id)
);

INSERT INTO songs (title, duration, album_id, artist_id) VALUES
('Sorry', 200, 1, 1),
('No Sense', 230, 1, 1),
('Devastated', 210, 2, 2),
('Paper Trail$', 215, 2, 2),
('One Dance', 173, 3, 3),
('Hotline Bling', 267, 3, 3),
('No Woman No Cry', 255, 4, 4),
('Three Little Birds', 180, 4, 4);

CREATE TABLE playlists (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO playlists (name, user_id) VALUES
('My Favorites', 1),
('Chill Playlist', 1);

CREATE TABLE playlist_songs (
    playlist_id INT NOT NULL,
    song_id INT NOT NULL,
    PRIMARY KEY (playlist_id, song_id),
    FOREIGN KEY (playlist_id) REFERENCES playlists(id),
    FOREIGN KEY (song_id) REFERENCES songs(id)
);

INSERT INTO playlist_songs (playlist_id, song_id) VALUES
(1, 1),
(1, 3),
(1, 5),
(2, 7),
(2, 8);
--Restore database changes after revert issue--