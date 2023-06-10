// get the client
const mysql = require("mysql2/promise");

// db config
const sqlHost = process.env.MYSQL_HOST || "localhost";
const sqlUser = process.env.MYSQL_USERNAME || "root";
const sqlPassword = process.env.MYSQL_PASSWORD || "password";
const sqlDatabase = process.env.MYSQL_DATABASE || "poridhi";

const dbConfig = {
  host: sqlHost,
  user: sqlUser,
  password: sqlPassword,
  database: sqlDatabase,
};
//table name
const sqlTable = "newses";

const getNewsFromDB = async () => {
  const query = `SELECT * FROM ${sqlTable}`;
  const connection = await mysql.createConnection(dbConfig);
  const [data, _] = await connection.execute(query);
  await connection.end();
  return data;
};

const addNewsToDB = async (text) => {
  const query = `INSERT INTO ${sqlTable} (text) VALUES ('${text}')`;
  const connection = await mysql.createConnection(dbConfig);
  await connection.execute(query);
  await connection.end();
};

module.exports = { getNewsFromDB, addNewsToDB };
