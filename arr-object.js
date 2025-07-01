const _ = require('lodash')


//OBJECT METHODS//
let user = {
    name:'ujjwal',
    age:{year:2004}
}

console.log(_.has(user,'name'))
let obj ={}
console.log(_.isEmpty(obj));

let obj1 ={username:'ujjwal'};
let obj2={paswword:1234};
console.log(_.merge(obj1,obj2));

let profile ={
    info:{
        name:'uprant',
        age:{year:2004}
    }
}
console.log(_.get(profile,'info.age.year'))

let object = {
    name:'prajjwal',
    age:23,
    password:'prajjwal@123',
    email: 'prajjwal@gmail.com'
}
console.log(_.omit(object,['name','password']))

//ARRAY METHODS//

