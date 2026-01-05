import express from "express";
import cors from "cors";
import "dotenv/config";
import { MOVIE_API_OPTIONS } from "./constants.js";

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

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

app.get("/api/popular", async (req, res) => {
  try {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      MOVIE_API_OPTIONS
    );

    if (!data.ok) throw new Error(`HTTP error, status: ${data.status}`);

    const json = await data.json();
    res.json(json);
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch: ${error.message}` });
  }
});

app.get("/api/top_rated", async (req, res) => {
  try {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
      MOVIE_API_OPTIONS
    );

    if (!data.ok) throw new Error(`HTTP error, status:${data.status}`);

    const json = await data.json();
    res.json(json);
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch: ${error.message}` });
  }
});

app.get("/api/upcoming", async (req, res) => {
  try {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
      MOVIE_API_OPTIONS
    );

    if (!data.ok) throw new Error(`HTTP error, status: ${data.status}`);

    const json = await data.json();

    res.json(json);
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch: ${error.message}` });
  }
});

app.get("/api/trailers", async (req, res) => {
  try {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        req.query.movieId +
        "/videos?language=en-US",
      MOVIE_API_OPTIONS
    );

    if (!data.ok) throw new Error(`HTTP error, status: ${data.status}`);

    const json = await data.json();
    res.json(json);
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch: ${error.message}` });
  }
});

app.get("/api/search", async (req, res) => {
  try {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        req.query.movie +
        "&include_adult=false&language=en-US&page=1",
      MOVIE_API_OPTIONS
    );

    if (!data.ok) throw new Error(`HTTP error, status: ${data.status}`);

    const json = await data.json();
    res.json(json);
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch: ${error.message}` });
  }
});

app.get("/api/movie_logo", async (req, res) => {
  try {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" + req.query.movieId + "/images",
      MOVIE_API_OPTIONS
    );

    if (!data.ok) throw new Error(`HTTP error, status: ${data.status}`);

    const json = await data.json();
    res.json(json);
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch: ${error.message}` });
  }
});

app.get("/api/movie_images", async (req, res) => {
  try {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" + req.query.movieId + "/images",
      MOVIE_API_OPTIONS
    );
    if (!data.ok) throw new Error(`HTTP error, status: ${data.status}`);

    const json = await data.json();
    res.json(json);
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch: ${error.message}` });
  }
});

// const port = process.env.PORT || 3001;
// app.listen(port, () => {
//   console.log(`Server started at port ${port}`);
// });

export default app;
