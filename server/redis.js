const { createClient } = require("redis");

// redis configs
const redisUsername = process.env.REDIS_USERNAME || "";
const redisPassword = process.env.REDIS_PASSWORD || "password";
const redisHost = process.env.REDIS_HOST || "localhost";
const redisPort = process.env.REDIS_PORT || "6379";
const redisConfigUrl = `redis://${redisUsername}:${redisPassword}@${redisHost}:${redisPort}`;

// create redis client
const redisClient = createClient(redisConfigUrl);

const addNewsToCache = async (news) => {
  await redisClient.connect();
  await redisClient.set("news", JSON.stringify(news));
  await redisClient.disconnect();
};

const getNewsFromCache = async () => {
  await redisClient.connect();
  const cachedNewsString = await redisClient.get("news");
  await redisClient.disconnect();
  return JSON.parse(cachedNewsString);
};

const deleteNewsFromCache = async () => {
  await redisClient.connect();
  await redisClient.del("news");
  await redisClient.disconnect();
};

module.exports = { addNewsToCache, getNewsFromCache, deleteNewsFromCache };
