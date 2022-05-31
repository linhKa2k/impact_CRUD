const mongoose = require('mongoose');
const listData = mongoose.Schema({
    name:String
})
module.exports = mongoose.model('listData',listData)