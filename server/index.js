require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { getNewsFromDB, addNewsToDB } = require("./db");
const {
  deleteNewsFromCache,
  getNewsFromCache,
  addNewsToCache,
} = require("./redis");
const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

//endpoints
app.get("/", (_, res) => {
  res.send("Hello World!");
});

//get news api
app.get("/get-news", async (_, res) => {
  try {
    // fetch cache
    const cachedNews = await getNewsFromCache();
    if (!cachedNews) {
      //fetch news from db
      const news = await getNewsFromDB();
      //populate cache with new data
      await addNewsToCache(news);
      return res.status(200).send({ isCached: false, news: news });
    }
    res.status(200).send({ isCached: true, news: cachedNews });
  } catch (error) {
    res.status(500).send({ message: "error fetching news" });
  }
});
//create news api
app.post("/create-news", async (req, res) => {
  const { text } = req.body;
  //   store news to db
  await addNewsToDB(text);
  //delete cache data
  await deleteNewsFromCache();
  res.status(201).send({ message: "news created successfully" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
