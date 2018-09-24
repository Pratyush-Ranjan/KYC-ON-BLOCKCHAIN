var mongoose=require('mongoose');
var users = require('./user');

var bank_list_for_customer_Schema= mongoose.Schema({
    _id:{type:mongoose.Schema.Types.ObjectId , ref : users.Users},

    banks : { type : Array } 
});

var Bank_list_for_customer=mongoose.model('bank_list_for_customer',bank_list_for_customer_Schema);

module.exports={
    Bank_list_for_customer:Bank_list_for_customer
}
