/**
 * Created by aersoz on 2/1/17.
 */

var mongoose = require("mongoose");

module.exports = mongoose.model('Record', {
    task: {type: mongoose.Schema.Types.ObjectId, ref: 'Task'},
    created: { type: Date, default: Date.now },
    duration : {type : Number}
});