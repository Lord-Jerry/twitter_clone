/**const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const token = jwt.sign({foo: 'bar'}, 'shhhhh');
console.log(token);
console.log(jwt.decode(token));**/
const bcrypt = require('bcrypt');
let password;
bcrypt.hash('hello',10)
.then(result => {
	password=result
	console.log(result);
	bcrypt.compare('hello',password)
.then(result=>{
	console.log(result)
})
.catch(err=> {
	console.log(err);
})
});
