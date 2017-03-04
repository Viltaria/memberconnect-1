'use strict';
const path = require('path');
const express = require('express');
const MongoClient = require('mongodb');
require('dotenv').config();

const app = express();

app.get('/test/:param?', (req, res) => {
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
			let valid = [];
			if (req.params.param) {
				data.forEach(e => {
					let found = false;
					for (let key in e) {
						if (e[key].toString().toLowerCase().includes(req.params.param.toLowerCase())) {
							found = true;
						}
					}
					if (found) {
						valid.push(e);
					}
				});
			} else {
				valid = data;
			}
			res.json(valid);
		});
	});
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(process.env.PORT, () => console.log(`💕  Its happening on port ${process.env.PORT || 9696} 💕`));

module.exports = app;
