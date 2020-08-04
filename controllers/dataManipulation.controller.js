var dataManipulationController = (function() {

    'use strict';

    var 
        HTTPStatus = require('http-status'),
        Promise = require("bluebird"),
        dataManipulationworker = require('../workers/baseData.worker');

      async function findData(req,res,next) {
          
          try{
          let query = {};

         const results =  await dataManipulationworker.findData(query);
           
         res.status(200).send(results);
          } catch(err) {
            res.status(500).send(err);
          }
      }

 return {
     findData : findData
 };


})();

module.exports = dataManipulationController;                                                                                                                                                                                                                                                                                                                                 