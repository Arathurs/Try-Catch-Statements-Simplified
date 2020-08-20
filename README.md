## Try/Catch Statements: Avoiding Cumbersone Multiple or Nested Statements


### About 

Developers are always adding error checks to their code. With the introduction of async\await, this leads to situations where multiple try/catch statements are called immediately after each other in rapid succession, or perhaps even worse from the perspective of a different developer, deeply nested try/catch statements.

As as an example, it's not unusual to end up with the following:

```
async function asyncFunc() {
  try {
    const result = await fetch("https://example.com");
  } catch (e) {
    console.log(e);
  }
try {
    const anotherresult = await secondAsyncFunc();
  } catch (error) {
    console.log(error);
  }
}
```
Some languages, for example PHP, provide robust information in catch instructions and use multiple catch blocks. Other's don't handle this as well, including JavaScript.

Fortunately, we can mimic this behaviour and enable JavaScript to handle multiple errpr types with simple syntax.

This method works in any language so long it as it supports arrays, simply return an array with two data items. 

### Finally the Code
First we wrap async calls with a tiny utility function. It will format the resolving and rejecting arguments to an array of two elements. 
To achieve this, we will need to wrap our async code with a small utility function. This function will format the resolving and rejecting arguments to an array of two elements. `check` will be the name of the wrapping function but it can be given any name. 
```
/**
 * @param { Promise } promise
 * @param { Object } improved - If you need to enhance the error.
 * @return { Promise }
 */
export function check(promise, improved){
  return promise
    .then((result) => [null, result])
    .catch((error) => {
      if (improved) {
        Object.assign(error, improved);
      }

      return [error]; // which is same as [err, undefined];
    });
}
```

The above function returns an array of two elements in either of two situations:
- The promise resolves ***On the then callback***: it returns `null` and the `result` as there are no errors.
- The promise rejects ***on the catch callback***: an `err` that can be extended amd since there is no data `undefined` as the second element.

Let's try updating the original try/catch block.  All we need to do is wrap the `asyncFunc` promise with our `check` funtion.

```
const [error, result] = await check(asyncFunc());
if(error){
  // log something and return ?
}
const [error2, result2] = await check(secondAsyncFunc());
if(error2){
  // do something else
} else {
  // Here we are sure that result2 is defined and a valid value
}
```

See how much cleaner this code looks. We can use this syntactic sugar to use try/catch block while writing cleanenr code.
