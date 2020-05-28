const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/users_test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection
  .once("open", () => {
    console.log("Connection is working");
  })
  .on("error", (error) => {
    console.warn("Warning", error);
  });

// Before each test clear out list of users
beforeEach((done) => {
  mongoose.connection.collections.users.drop(() => {
    // Ready to run next test
    done();
  });
});
