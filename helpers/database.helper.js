(function (databaseHelper) {

    'use strict';

    var Promise = require("bluebird"),
        dbConfig = require('../config/database.config'),
        HTTPStatus = require('http-status'),
        path = require('path'),
        mongoose = Promise.promisifyAll(require('mongoose'));


    databaseHelper.init = function (app) {

        var dbUrl = '';
            if (dbConfig.development.username === '' && dbConfig.development.password === '') {
                dbUrl = "mongodb://" + dbConfig.development.host + ":" + dbConfig.development.port + "/" + dbConfig.development.dbName;
            }
            else {
                dbUrl = "mongodb://" + dbConfig.development.username + ":" + dbConfig.development.password + "@" + dbConfig.development.host + ":" + dbConfig.development.port + "/" + dbConfig.development.dbName;
            }
       
        var options = {promiseLibrary: require('bluebird')};
        mongoose.Promise = require('bluebird');
        mongoose.connect(dbUrl, options);

        var db = mongoose.connection;
        // CONNECTION EVENTS
        // When successfully connected

        db.on('connected', function () {
            console.log('Mongoose connection successful.');
           
        });
        // When the connection is disconnected
        db.on('disconnected', function () {
            console.log('Mongoose  connection disconnected');
        });

        // If the connection throws an error
        db.on('error', function (err) {
            console.log('Mongoose  connection error: ' + err);
        });

        // If the Node process ends, close the Mongoose connection
        process.on('SIGINT', function () {
            mongoose.connection.close(function () {
                console.log('Mongoose default connection disconnected through app termination');
                process.exit(0);
            });
        });
    
    };
}(module.exports));
