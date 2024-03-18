import express from "express";
import { join } from "path";
import bodyParser from "body-parser";


const app = express();


const PORT = 3000;

let myArray = [];

// Static route 
// Serve bootstrap CSS file 
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }))

// GET Request 
app.get('/', (req, res) => {
	res.render("index.ejs");
})


app.post('/submit', (req, res) => {
	var flag = true;
	console.log(req.body);
	myArray.push(req.body);
	console.log(myArray);
	res.render("index.ejs", { flag: flag });
})


app.post('/update', (req, res) => {
	
	console.log(req.body);
	if (myArray.some(e => e.article == req.body.article)) {
		myArray = myArray.filter(post => post.article !== req.body.article);
		myArray.push(req.body);
	} else {
		myArray.push(req.body);
	}
	console.log(myArray);
	res.send("<h1>your post has updated</h1>");
})

app.get('/home', (req, res) => {

	console.log("myArray", myArray);
	res.render("home.ejs", { myArray: myArray });
})

app.get('/:id', (req, res) => {

	var article = req.params.id;
	var post = myArray.filter((a) => a.article == article);
	console.log("post array-", post);
	res.render("home.ejs", { post: post, myArray: myArray });

})

app.get('/delete/:id', (req, res) => {

	var article = req.params.id;
	myArray = myArray.filter(post => post.article !== article);
	console.log("delete array-", myArray);
	res.send("<h1>your post has deleted</h1>");

})

// Start the server 
app.listen(PORT, err => {
	err ?
		console.log("Error in server setup") :
		console.log("Server listening on Port", PORT)
});
