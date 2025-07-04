 let fs = require('fs')

const b = fs.appendFile('file.text', so.username+'hi/n',(error)=>{
   if(error){
    console.log("error while not appending",error)
   }else{
    console.log("file ppending is succesfully")
   }
})
 info = {
   name:"alice",
   interest:"to gain knowledge",
   student: true,
   skill: 'developer'
}
console.log(info)
module.export =info
const a = fs.readFileSync("file.text",'utf8',(error,data)=>{
if(error)throw error;
console.log(data)
})
console.log(a)
module.export= a

