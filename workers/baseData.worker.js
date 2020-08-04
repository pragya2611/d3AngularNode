const bseDataModel = require('../models/baseData.managment.model');

module.exports.findData = async function (query) {
    return await bseDataModel.find(query);
}