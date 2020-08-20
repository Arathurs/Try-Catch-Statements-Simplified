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


// An example using the check() above
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