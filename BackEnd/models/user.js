const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required:true,
        unique: true
    },
    name: String,
    passwordHash: String,

    

    //ids of notes are stored in array "notes" as ,
    // id and the dataset it refers to. 

    notes:[
        {
            //syntax for object id as a type is from mongoose
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Note'
        }
    ],
})

userSchema.set('toJson', {
    transform: (document, returnedObject) =>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v

        //do not reveal passwords. 
        delete returnedObject.passwordHash
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User