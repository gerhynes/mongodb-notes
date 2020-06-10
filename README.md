# MongoDB Notes

## Review of Promises

A promise is a tool for managing asynchronous code flow throughout your application. In other words, any code that will execute sometime in the future.

When you create a promise, you pass in a function. This function is called with the `resolve` and `reject` functions. These allow you to manipulate the state that a promise is in.

By default, a promise has 3 possible states:

1. unresolved - waiting for something to finish.
2. resolved - something finished and all went ok.
3. rejected - something finished and something went bad.

If you call `resolve()`, the promise enters the resolved state.

If you call `reject()`, the promise enters the rejected state.

Once you resolve or reject a promise, any callbacks attached to the promise are called.

Example game without promises:

```js
let counter = 0;

document.querySelector("button").addEventListener("click", () => {
  ++counter;
});

setTimeout(() => {
  if (counter > 5) {
    alert(`You won! Your clicks: ${counter}`);
  } else {
    alert("Sorry, you lost");
  }
}, 2000);
```

Example game with promises:

```js
function startGame() {
  let counter = 0;

  document.querySelector("button").addEventListener("click", () => {
    ++counter;
  });

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (counter > 5) {
        resolve();
      } else {
        reject();
      }
    }, 2000);
  });
}

startGame() // Returns the promise
  // Called if the promise is resolved. Handles success.
  .then(() => {
    alert("You win!");
  })
  // Called if the promise is rejected. Handles failure.
  .catch(() => {
    "You lost";
  });
```

## Where to use MongoDB

Mongo is a database where the data of your app persists.

Your database is seperated from the frontend by a web server. The web server filters any requests for data before they reach your database.

Security around your data is enforced by rules that you place in your web server.

Mongoose is an ORM (Object Relational Mapper) or ODM (Object Data Mapping) which helps you to work with your database.

## Mongo Core Principals

Mongo lets you create multiple databases inside one Mongo instance.

The collection is the core unit which stores data inside a Mongo database.

You will typically have one collection for each type of resource that you need to make available in your app.

Ahead of time, you will design a schema for the different types of data you'll need to store in your app.

## Core Mongoose and Mongo Ideas

When working with a Mongo database there are four key operations:

- Create
- Read
- Update
- Destroy

## Models

Mongoose creates models that represent all records in a specific collection.

The model is used to create objects that represent single instances within the collection (single records in the database).

Models have a schema which tells us exactly what properties you can expect each record in the collection to have and what type of data we expect it to be.

A model does not represent any particular record inside the application, it represents the entire collection of data inside the database.

## Mocha

Every test file has a Describe block (basically a Describe function).

Inside the function are a variety of it blocks.

Inside each it block is code to test a very specific part of the code in the model.

### isNew

Whenever you create a new model Mongoose will place an `isNew` flag on the model to show it hasn't yet been saved to the database.

Initially `isNew` is set to `true`. Once the record has been saved, `isNew` is set to `false`.

## Mongoose Queries

`User.find(criteria)` - Find all the users that match the given criteria. Returns an array.

`User.findOne(criteria)` - Find the first user that matches the criteria. Returns a single record.

## The \_id Property

In contrast to other ORMs, Mongoose assigns an id to a record as soon as it is created, before it is saved to the database.

The `_id` property of a Mongo record is not the raw string of the id. The `_id` is an object that encapsulates that string.

To compare the `_id` of a record when it is created and when it is in the database, you need to call `toString()` on both `_id`s.

```js
assert(users[0]._id === joe._id); // false
assert(users[0]._id.toString() === joe._id.toString()); // true
```

## Removing records

Mongoose uses the terminology "remove", not "delete".

Individual model instances have a `remove` method.

Model classes also have a `remove` method, into which you pass some criteria in order to find specific instances in the database.

Model classes also have a `findOneAndRemove` and `findByIdAndRemove` methods.

## Updating a Record

Individual model instances can be updated using the `update` method or the `set` and `save` functions.

Model classes can be updated using the `update`, `findOneAndUpdate` and `findByIdAndUpdate` methods.

## Update Operators

Update operators let you send an instruction to Mongo and Mongo will execute it inside the database.

This is more performant than fetching the data from the database, modifying it on the server, and then sending it back to the database.

`$inc` - increments the value of the field by the specified amount.

`$mul` - multiplies the value of the field by the specified amount.

`$rename` - renames a field.

`$set` - set the value of a field in a document.

These operators are especially useful when you want to change a lot of records in one go.

## Record Validation

Mongoose lets you validate records against a specific criteria before inserting them into the database.

Make the validation message user-readable, for example "Name is required", not "UserSchema Expected Name Prop".

## Embedding Resources in Models (Subdocuments)

In a relational database, if you wnated users to have blogposts associated with them, you might have a User model and a different Post model.

With Mongo, since a post is always associated with one user, it would make sense to have a list of posts inside the User model.

The User model would have a user schema (with a name, postCount and list of posts) and a post schema (with title, content, etc.).

Mongoose models are made to represent distinct collections that exist inside your MongoDb database.

## Adding Subdocuments to Existing Records

The only way to save a subdocument is to add it to the parent model and then call save on the parent model.

## Removing Subdocuments

When you remove a subdocuement, it does not automatically save the record in the database. You still have to manually call save on the parent record.

## Virtual Types

A virtual type is any field on a model that does not get persisted to the MongoDB database.

For example, postCount can be calculated from looking at the length of the posts array, rather than being stored as its own value.

When you try to access a virtual type, it runs a getter function which returns the value.

## Embedded Documents vs Seperate Collections

Instead of having nested subdocuments (such as users with posts nested inside and comments nested inside posts), you could have three different collections: User, Post, Comment.

A User could have an array of postIds pointing to specific posts.

In addition, a Post could have an array of commentIds pointing to specific comments.

Each Comment could have a userId pointing back to a specific user.

The downside to this approach is that queries get more costly. To get all posts by a particular user, you would have to fetch the user from the database and then go back and fetch the relevant posts connected to that user.

Mongo doesn't have single operation joins, and so this quasi-relational approach isn't necessarily efficient for querying as you have to touch the database multiple times.

## Queries

A query does not automatically go off to your datbase. It only does so once `.then()` is called on it.

Mongoose lets you add modifiers to enhance and customize your query.

```js
User.findOne({ name: "Joe" }).populate("blogPosts").then();
```

## Loading deeply nested associations

Mongoose does not let you automatically recursively load all associations.

To load nested associations, use the `.populate()` modifier and specify the paths to the documents in the other collections. You also pass their model instance to populate.

```js
User.findOne({ name: "Joe" })
  .populate({
    // load blogposts
    path: "blogPosts",
    // inside blogPosts load comments
    populate: {
      path: "comments",
      model: "comment",
      // inside comments load users
      populate: {
        path: "user",
        model: "user",
      },
    },
  })
  .then();
```

## Middleware (Pre and Post Hooks)

Middleware are functions that execute before and after some distinct event takes place with Mongoose. For example, right before and after a record is removed.

The four events you can watch for in Mongoose are: init, validate, save and remove.

## Skip, Limit and Sort

`skip()` lets you skip a specified number of records.

`limit()` restricts the number of results to a query.

`sort()` lets you sort the results of a query. You can pass in an object specifying which value to sort by and in which order, for example `.sort({ name: 1 })`.
