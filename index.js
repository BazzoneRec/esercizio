var express = require("express");

var bodyParser = require("body-parser");

var app = express();

var uniqid = require('uniqid');

var PORT = process.env.PORT || 3000;

var assignments = [];

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

// Create a new assignment
app.post("/assignments", (req, res) => {
	var taskID = req.body.taskID;
	// generato dal server
	var assignmentID = uniqid();
	var workerID = req.body.workerID;
	var assignmentResult = {};

	var newAssignment = {
		taskID : taskID,
		assignmentID : assignmentID,
		workerID : workerID,
		assignmentResult : assignmentResult
	};

	console.log("NEW ASSIGNMENT");
	console.log(newAssignment);

	assignments.push(newAssignment);
	res.status(201);
	// Ritorna l'assignment creato
	res.json(newAssignment);
});

// Read all the assignments
app.get("/assignments", (req, res) => {
	if (assignments.length > 0) {
		res.status(200);
		// Ritorna tutti gli assigments
		res.send(assignments);
	}
	else {
		res.sendStatus(404);
	}
});

// Read One specific assignment
app.get("/assignments/:id", (req, res) => {
	var id = req.params.id;
	var index = -1;
	for (var i = 0; i < assignments.length; i++) {
		if (assignments[i].assignmentID == id) {
			index = i;
		}
	}

	// Se è stato trovato
	if (index != -1) {
		res.status(200);
		res.json(assignments[index]);
	}
	else {
		res.sendStatus(404);
	}
});

// Modify one specific assignment
// Se non c'è l'id la risorsa viene creata(201)
// Se l'id c'è la risorsa viene updatata (200)
app.put("/assignments/:id", (req, res) => {
	var id = req.params.id;
	var taskID = req.body.taskID;
	var workerID = req.body.workerID;
	var assignmentResult = req.body.assignmentResult;
	var index = -1;
	for (var i = 0; i < assignments.length; i++) {
		if (assignments[i].assignmentID == id) {
			index = i;
		}
	}

	if (index != -1) {
		assignments[index].taskID = taskID;
		assignments[index].workerID = workerID;
		assignments[index].assignmentResult = assignmentResult;
		res.status(200);
		res.json(assignments[index]);
	}
	else {
		var assignmentID = uniqid();
		var newAssignment = {
			taskID : taskID,
			assignmentID : assignmentID,
			workerID : workerID,
			assignmentResult : assignmentResult
		};
		assignments.push(newAssignment);
		res.status(201);
		res.json(newAssignment);
	}
});

// Elimina un assignment specifico
app.delete("/assignments/:id", (req, res) => {
	var id = req.params.id;
	var index = -1;
	for (var i = 0; i < assignments.length; i++) {
		if (assignments[i].assignmentID == id) {
			index = i;
		}
	}
	if (index != -1) {
		assignments.splice(index, 1);
		res.sendStatus(204);
	}
	else {
		res.sendStatus(404);
	}
});


app.listen(PORT, console.log("Listening to port : " + PORT));

