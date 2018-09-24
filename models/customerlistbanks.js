var mongoose=require('mongoose');
var users = require('./user');

var customerlistbanksSchema= mongoose.Schema({
    _id:{type:mongoose.Schema.Types.ObjectId , ref : users.Users},

    pendingcustomers : { type : Array } ,

    confirmedcustomers : { type : Array } 
});

var customerlistbanks=mongoose.model('customerlistbanks',customerlistbanksSchema);

module.exports={
    customerlistbanks:customerlistbanks
}
