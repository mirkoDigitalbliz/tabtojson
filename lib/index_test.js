import app from "./server_test.js";

const http = require("http");
const cronJob = require('cron').CronJob;


const port = process.env.PORT || 3333;
var server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server is up on ${port}`);
})