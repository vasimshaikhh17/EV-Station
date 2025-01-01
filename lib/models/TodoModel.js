const { default: mongoose } = require("mongoose");

const Schema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    isCompleted:{
        type:Boolean,
        default:false
    },
})

const testModel = mongoose.models.test || mongoose.model("test", Schema);

export default testModel