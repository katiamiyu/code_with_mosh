
const users = [
  {id:1,name:'derele'},
  {id:2,name:'boye'},
  {id:3,name:'ibrahim'}
];

console.log(`welcome to world of promises`);
//getUsers(users, function(users){
//  console.log(users);
//});
//getUsers(users).then(users => console.log(users)).catch(err=>console.log(err.message));
async function displayUsers(users){
  try {
    const result = await getUsers(users);
    console.log(result);
  } catch (error) {
    console.log('error', error.message);
  }
}
displayUsers(users);

console.log(`thanks, goodbye`);

const p1 = Promise.resolve([1,2,3]);
const p2 = Promise.resolve([4,5,6]);

Promise.race([p1, p2]).then(res=>console.log(res)).catch(rej=>console.log(rej));



function getUsers(users){
  return new Promise((resolve, reject)=>{
    setTimeout(()=>{
    resolve(JSON.stringify(users));
    //reject(new Error('err connecting to base'));
  }, 2000);
  });
}