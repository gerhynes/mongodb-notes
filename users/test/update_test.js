const assert = require("assert");
const User = require("../src/user");

describe("Updating records", () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: "Joe" });
    joe.save().then(() => done());
  });

  // helper function
  function assertName(operation, done) {
    operation
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === "Joseph");
        done();
      });
  }

  it("instance type using set and save", (done) => {
    joe.set("name", "Joseph");
    assertName(joe.save(), done);
  });

  it("a model instance can update", (done) => {
    assertName(joe.update({ name: "Joseph" }), done);
  });

  it("a model class can update", (done) => {
    assertName(User.update({ name: "Joe" }, { name: "Joseph" }), done);
  });

  it("a model class can update one record", (done) => {
    assertName(
      User.findOneAndUpdate({ name: "Joe" }, { name: "Joseph" }),
      done
    );
  });

  it("a model class can find a record with an ID and update", (done) => {
    assertName(User.findByIdAndUpdate(joe._id, { name: "Joseph" }), done);
  });
});
