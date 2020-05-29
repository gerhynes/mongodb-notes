const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

before((done) => {
  mongoose.connect("mongodb://localhost/users_test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.connection
    .once("open", () => {
      done();
    })
    .on("error", (error) => {
      console.warn("Warning", error);
    });
});

// Before each test clear out list of users
beforeEach((done) => {
  mongoose.connection.collections.users.drop(() => {
    // Ready to run next test
    done();
  });
});
