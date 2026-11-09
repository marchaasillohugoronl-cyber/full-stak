const mongoose=require('mongoose')
const Shema= mongoose.Schema

const messageShema=new Shema({
    username:String,
    message:String

})

const Message=mongoose.model('Message', messageShema)

module.exports=Message