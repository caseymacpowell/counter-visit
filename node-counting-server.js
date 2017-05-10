var http = require("http");
var fs = require("fs");
var count = 0;

fs.readFile("./count.txt", function(err, data){
	//read file that's holding homepage views as server starts up
	if(err){
		fs.writeFile("./count.txt", count, function(err){
			//if no file is found, create one called count.txt
			if(err){
				console.log(err);
			}
			fs.readFile("./count.txt", function(err, data){
				//once file is created, read it
				if(err){
					console.log(err);
				}
				count = parseInt(data); //store data as a number
			});
			console.log("File Written!");
		});
	}
	count = parseInt(data); //if file does exists, save data as a number to a global variable, "count"
});

var server = http.createServer(function(req, res){
	//create server with an if statment for various different page visits
	if(req.url === "/"){
		//if client views homepage, add to our overall count
		count += 1;
		fs.readFile("./cats.html", function(err, data){
			//read html file and display it to viewer
			if(err){
				res.write("Trouble reading file...");
				res.end();
			}
			res.write(data);
			res.end();
		});
		fs.writeFile("./count.txt", count, function(err){
			//write the new page view count to our text file
			if(err){
				console.log(err);
			}
			console.log("File Written!");
		});
	} else if(req.url === "/count"){
		//display the count on count page
		res.write(count.toString());
		res.end();
	}
});

server.listen(8080);

console.log("Server started http://localhost:8080");