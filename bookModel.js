//including mongoose 
var mongoose = require('mongoose');

//declaring db
var Schema = mongoose.Schema;

var bookSchema = new Schema ({

	title    	 :   {type:String,default:'',required:true},
	create_date  :   {type:Date,default:Date.now},
	description  :   {type:String,default:'',required:true},
/*	authorInfo	 :   {
						name:{type:String,default:'',required:true},
						age:{type:Number},
						email:{type:String}
					 }*/
});

//connect with model and schema
mongoose.model('Book',bookSchema);