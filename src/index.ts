import config from "./config/config.js";
import app from "./app.js";

app.listen(config.port, () => {
  console.log("The server is running on port: ", config.port);
});

