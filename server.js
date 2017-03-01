'use strict';
const path = require('path');
const express = require('express');
const MongoClient = require('mongodb');
require('dotenv').config();

const app = express();

app.get('/test', (req, res) => {
	MongoClient.connect('mongodb://localhost:27017/memberconnect', function (err, db) {
		if (err) {
			return console.error('Connection Error. @mongodb');
		}
		function query(callback) {
			db.collection('people').find().toArray(function (err, result) {
				if (err) {
					return console.error('Error converting data to array');
				}
				callback(result);
			});
		}
		query(function (data) {
			res.json(data);
		});
	});
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(process.env.PORT, () => console.log(`💕  Its happening on port ${process.env.PORT || 9696} 💕`));

module.exports = app;
