-- Hämtar alla artister
SELECT * FROM artists;

-- Hämtar top 3 mest spelade artister
SELECT * FROM artists
ORDER BY play_count DESC
LIMIT 3;

-- Hämtar alla album
SELECT * FROM albums;

-- Hämtar alla låtar
SELECT * FROM songs;

-- Hämtar alla playlists
SELECT * FROM playlists;

-- Hämtar album tillsammans med artistnamn
SELECT albums.title AS album_title, albums.release_year, artists.name AS artist_name
FROM albums
JOIN artists ON albums.artist_id = artists.id;

-- Hämtar låtar tillsammans med album
SELECT songs.title AS song_title, songs.duration, albums.title AS album_title
FROM songs
JOIN albums ON songs.album_id = albums.id;

-- Hämtar låtar tillsammans med artist
SELECT songs.title AS song_title, artists.name AS artist_name
FROM songs
JOIN artists ON songs.artist_id = artists.id;

-- Hämtar låtar tillsammans med både album och artist
SELECT songs.title AS song_title, albums.title AS album_title, artists.name AS artist_name
FROM songs
JOIN albums ON songs.album_id = albums.id
JOIN artists ON songs.artist_id = artists.id;

-- Hämtar playlists tillsammans med användare
SELECT playlists.name AS playlist_name, users.username
FROM playlists
JOIN users ON playlists.user_id = users.id;

-- Hämtar alla låtar i playlists
SELECT playlists.name AS playlist_name, songs.title AS song_title
FROM playlist_songs
JOIN playlists ON playlist_songs.playlist_id = playlists.id
JOIN songs ON playlist_songs.song_id = songs.id;

-- Hämtar alla låtar i en specifik playlist
SELECT playlists.name AS playlist_name, songs.title AS song_title
FROM playlist_songs
JOIN playlists ON playlist_songs.playlist_id = playlists.id
JOIN songs ON playlist_songs.song_id = songs.id
WHERE playlists.id = 1;

-- Hämtar alla album för en specifik artist
SELECT albums.title AS album_title, artists.name AS artist_name
FROM albums
JOIN artists ON albums.artist_id = artists.id
WHERE artists.id = 3;

-- Hämtar alla låtar för en specifik artist
SELECT songs.title AS song_title, artists.name AS artist_name
FROM songs
JOIN artists ON songs.artist_id = artists.id
WHERE artists.id = 3;

-- Räknar hur många låtar varje artist har
SELECT artists.name AS artist_name, COUNT(songs.id) AS number_of_songs
FROM artists
LEFT JOIN songs ON artists.id = songs.artist_id
GROUP BY artists.id, artists.name;

-- Räknar hur många album varje artist har
SELECT artists.name AS artist_name, COUNT(albums.id) AS number_of_albums
FROM artists
LEFT JOIN albums ON artists.id = albums.artist_id
GROUP BY artists.id, artists.name;