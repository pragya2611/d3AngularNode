(function () {

    'use strict';

    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,

    bseData=new Schema({
        Date: {
            type:String,
            required:true,
            trim: true
        },
        open: {
            type:Number,
              
        },
        high: {
            type:Number,   
        },
        low: {
            type:Number,  
        },
       
      
    });

    module.exports = mongoose.model('BSEStockData', bseData, 'BSEStockData');

})();