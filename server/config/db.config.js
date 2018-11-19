const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/twitter';
const connect = (()=>{
      mongoose.promise = global.promise;
      mongoose.connect(url,{
            useNewUrlParser: true
      }).then(()=>{
                  console.log('connected successfully');
         }).catch(err=>{
                  console.error('error');
                  //process.exit();
            });
     })();
module.exports = connect;