const mongoose = require('mongoose')

if(process.argv.length<3){
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://Rohan_Lahane:${password}@cluster0.cehsxtq.mongodb.net/noteApp?retryWrites=true&w=majority`
mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content: {
        type: String,
        minLength: 3,
        required: true
    },
    important: Boolean,
})

//function to make an addition to the noteschema dataset
const Note = mongoose.model('Note', noteSchema)

const note = new Note({
    content: 'css niee', 
    important: false,
}
)
note.save().then(result=>{
    console.log('note saved!')
    mongoose.connection.close()
})

Note.find({}).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })


