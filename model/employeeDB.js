const mongoose = require("mongoose");
 mongoose.connect('mongodb+srv://pearltom:<hn.Hmd7!xeLJBPN>@cluster0.rqz4jdj.mongodb.net/?retryWrites=true&w=majority')

const schema = mongoose.Schema;

const empSchema = new schema({
    name: String,
    location: String,
    position: String,
    salary: Number

})

const EMPModel = mongoose.model("employs", empSchema); 

module.exports = EMPModel;