import db from //database, lägger till när johan är klara med det 

export const getArtists = async () => {
    const [artists] = await db.query("SELECT * FROM artists");
    return artists;
  };
  
  export const getTop3Artists = async () => {
    const [artists] = await db.query("SELECT * FROM artists LIMIT 3");
    return artists;
  };