const { app, RED, server } = require("./app");
const PORT = process.env.PORT || 8000;

// listening
server.listen(PORT, () => {
  console.log("flow service running on port :" + PORT);
});

server.on("error", (error) => {
  if (error) {
    console.error(error);
    return process.exit(1);
  } else {
    console.log("express main configured  and listening on port:.");
  }
});

RED.start();
