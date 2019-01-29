var fetch = require("node-fetch");

const url = process.env.SERVER_URL;

var assignment1 = {
	taskID : "task01",
	// Questo è l'id generato dal server
	workerID : "worker01",
	assignmentResult : {}
};

var updatedAssignment = {
	taskID : "updated task 01",
	workerID : "updated worker",
	assignmentResult : {}
}

// Questo id server per il get sul singolo assignment
var id = "";

test("Valid post on /assignments", () => {
	expect.assertions(1);
	return fetch(url+"/assignments", {
		method: "post",
		body: JSON.stringify(assignment1),
		headers: { 'Content-Type': 'application/json' },
	}).then(res => {
		expect(res.status).toBe(201);
		return res.json();
	}).then(rjson => {
		console.log("TEST ON POST /assignments");
		console.log(rjson);
		id = rjson.assignmentID;
		console.log("id : " + id);
	});
});

test("Valid get on /assignments", () => {
	expect.assertions(1);
	return fetch(url+"/assignments", {
		method : "get",
		headers: { 'Content-Type': 'application/json' },
	}).then(res => {
		expect(res.status).toBe(200);
		return res.json();
	});
});


test("Valid get on /assignments/:id", () => {
	expect.assertions(1);
	return fetch(url+"/assignments/" + id, {
		method : "get",
		headers: { 'Content-Type': 'application/json' },
	}).then(res => {
		expect(res.status).toBe(200);
		return res.json();
	}).then(rjson => {
		console.log("GET ASSIGNMENT");
		console.log(rjson);
	});
});

test("Valid put on /assignments/:id", () => {
	expect.assertions(1);
	return fetch(url+"/assignments/" + id, {
		method : "put",
		body : JSON.stringify(updatedAssignment),
		headers: { 'Content-Type': 'application/json' },
	}).then(res => {
		expect(res.status).toBe(200);
		return res.json();
	}).then(rjson => {
		console.log("PUT");
		console.log(rjson);
	});
});

test("Valid delete on /assignments/:id", () => {
	expect.assertions(1);
	return fetch(url+"/assignments/"+ id, {
		method : "delete",
		headers: { 'Content-Type': 'application/json' },
	}).then(res => {
		expect(res.status).toBe(204);
	});
});