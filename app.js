var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');

// installing mongoose module
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

app.use(bodyParser.json({limit:'10mb',extended:true}));
app.use(bodyParser.urlencoded({limit:'10mb',extended:true}));

//configuring db

var dbPath = "mongodb://localhost/books";

db = mongoose.connect(dbPath);

mongoose.connection.once('open', function(){

	console.log('Success ! Database connection open');
});

//including the model file
var Book = require('./bookModel.js');

// declaring bookmodel schema
var bookModel = mongoose.model('Book');

app.get('/',function(req, res){

res.send("Hi there!, This is Backend for my Books Shelf. use /books to see all books, use /books/_id to see one book")
});

//POST to create new book entry
app.post('/books/create',function(req,res){
  var newBook = new bookModel({

  	title : req.body.title,
  	description: req.body.description,

  	});
// newBook.authorInfo = {name:req.body.name,age:req.body.age,email:req.body.email};
  //create new book
  newBook.save(function(err,result){
  	if(err){
  		res.send(err);
  	}
  	else{
  		res.send(newBook);
  	}

  });
});

//GET req to find a book by ID

app.get('/books/:Id',function(req,res){

	bookModel.find({"_id":req.params.Id},function(err,result){
		if(err){
			res.send(err);
		}
		else{
			res.send(result);
		}
	});
});

//GET for all books
app.get('/books',function(req,res){

	bookModel.find({},function(err,result){
		
		if(err){
			console.log(err);
			res.send(err);
		}
		else {
		console.log(result);
		res.send(result);
		}
	});
});

//PUT to Edit a book info
//PUT request to Edit a blog

app.put('/books/edit/:Id',function(req,res){

	var update = req.body ;

	//Finding a book and updating it. New:true returns the updated document

	bookModel.findOneAndUpdate({"_id": req.params.Id},update,{new: true},function(err,result){

        if(err){
			res.send(err);
			}
			else{
			console.log(result);
			res.send(result);
			}
		
	});  // findOneAndUpdate ends

}); //PUT request ends


//POST to delete a book

app.post('/books/delete/:Id',function(req,res){

	var bookDelete = req.params.Id ;
	

	bookModel.remove({"_id": bookDelete},function(err,result){

		
		if(err){
			res.send(err); 
		}
		else{
			res.json({Info:"Book Deleted Successfully"});
		}

	});  //  remove book ends

});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});