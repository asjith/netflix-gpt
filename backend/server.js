import express from "express";
import "dotenv/config";
import { MOVIE_API_OPTIONS } from "./constants.js";

const app = express();

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.get("/api/now_playing", async (req, res) => {
  try {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?page=1",
      MOVIE_API_OPTIONS
    );

    if (!data.ok) throw new Error(`HTTP error, status: ${data.status}`);

    const json = await data.json();
    res.json(json);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Failed to fetch nowPlayingMovies : ${error.message}` });
  }
});

// const port = process.env.PORT || 3001;
// app.listen(port, () => {
//   console.log(`Server started at port ${port}`);
// });

export default app;
