const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/users_test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection
  .once("open", () => {
    "Good to go!";
  })
  .on("error", (error) => {
    console.warn("Warning", error);
  });
