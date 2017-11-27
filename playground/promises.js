var asynchAdd=(a,b)=>{
  return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        if(typeof a ==='number' && typeof b==='number'){
          resolve(a+b);
        }
        else{
          reject("Arguments must be number");
        }
      },1500)
})
};
// Asynchronous promise example
// asynchAdd(3,'a').then((result)=>{
//   console.log(result)
// },(error)=>{
//   console.log(error);
// }
//);

// Promise Basics
// var somePromise= new Promise((resolve,error)=>{
//   setTimeout(()=>{
//     //  resolve("Was able to resolve the promise");
//     error("Unable to fulfil promise");
//   },2500)
// })
//
// somePromise.then((message)=>{
//   console.log(message);
// },(error)=>{
//   console.log(error)
// })


//Promise Resolver
// asynchAdd(3,3).then((result)=>{
//   console.log(result);
//   return asynchAdd(result,3);
// },(error)=>{
//   console.log(error);
// }
// ).then((res)=>{
//   console.log(res);
// },(err)=>{
//   console.log(err);
// });

asynchAdd(3,'a').then((result)=>{
  console.log(result);
  return asynchAdd(result,3);
}).then((res)=>{
  console.log(res);
}).catch((err)=>{
  console.log(err);
});
