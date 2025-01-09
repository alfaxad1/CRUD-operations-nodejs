require("dotenv").config();

const app = require("./app");

const appName = process.env.APP_NAME;
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`${appName} listening on port ${port}...`);
});
