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
