const taskRepo = require('../../dbLayer/repositories/taskRepo');
var MongoClient = require('mongodb').MongoClient,
    config = require('../../config');

exports.save = function (db, req, res) {
        taskRepo.post(db, {name: "Company Inc", address: "Highway 37"}, req, res);
};

exports.get = function (db, req, res) {
        taskRepo.get(db, {}, req, res);
};

exports.update = function (db, req, res) {
        taskRepo.put(db,  {address: "Highway 37"} ,{ $set: {name: "Mickey", address: "Canyon 123" } }, req, res);
};

exports.delete = function (db, req, res) {
        taskRepo.delete(db,  { address: "Canyon 123" } , req, res);
};