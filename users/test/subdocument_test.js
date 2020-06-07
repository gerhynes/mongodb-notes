const assert = require("assert");
const User = require("../src/user");

describe("Subdocuments", () => {
  it("can create a subdocument", (done) => {
    const joe = new User({
      name: "Joe",
      posts: [{ title: "JavaScript and Me" }],
    });

    joe
      .save()
      .then(() => User.findOne({ name: "Joe" }))
      .then((user) => {
        assert(user.posts[0].title === "JavaScript and Me");
        done();
      });
  });

  it("can add subdocuments to an existing record", (done) => {
    const joe = new User({ name: "Joe", posts: [] });

    joe.save().then(() =>
      User.findOne({ name: "Joe" })
        .then((user) => {
          user.posts.push({ title: "Python is also great" });
          return user.save();
        })
        .then(() => User.findOne({ name: "Joe" }))
        .then((user) => {
          assert(user.posts[0].title === "Python is also great");
          done();
        })
    );
  });
});
