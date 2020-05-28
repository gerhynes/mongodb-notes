const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/users_test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection
  .once("open", () => {
    console.log("Connection is working, ya big eejit");
  })
  .on("error", (error) => {
    console.warn("Warning", error);
  });
