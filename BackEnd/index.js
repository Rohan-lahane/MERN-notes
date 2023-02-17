require('dotenv').config()
console.log('hello world')
// const { request } = require('express')
const express = require('express')
const app = express()
const cors = require('cors')
// const mongoose = require('mongoose')
const Note = require('./models/note')

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 
  else if(error.name ==='validationError'){
    return response.status(400).json({error: error.message})
  }

  next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)

// if(process.argv.length<3){
//   console.log('give password as argument')
//   process.exit(1)
// }

// const password = process.argv[2]

// const url = `mongodb+srv://Rohan_Lahane:${password}@cluster0.cehsxtq.mongodb.net/noteApp?retryWrites=true&w=majority`

// mongoose.set('strictQuery', false)
// mongoose.connect(url)


// const noteSchema = new mongoose.Schema({
//   content: String,
//   important: Boolean,
// })

// noteSchema.set('toJSON', {
//   transform:(document, returnedObject)=>{
//     returnedObject.id = returnedObject._id.toString()
//     delete returnedObject._id
//     delete returnedObject.__v
//   }
// })

// const Note = mongoose.model('Note', noteSchema)

const generateId=()=>{
  const maxId = notes.length >0 
  ? Math.max(...notes.map(n=>n.id))
  :0

  return maxId+1
}
// const http = require('http')

let notes = [
    {
      id: 1,
      content: "HTML is easy",
      date: "2022-05-30T17:30:31.098Z",
      important: true
    },
    {
      id: 2,
      content: "Browser cannn execute only Javascript",
      date: "2022-05-30T18:39:34.091Z",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      date: "2022-05-30T19:20:14.298Z",
      important: true
    }
  ]


  // app.get('/',(request,response)=>{
  //   response.send(index.html)
  // })

  app.get('/api/notes/:id', (request,response,next)=>{
    // const id = Number(request.params.id)
    
    // const note = notes.find(note=>note.id===id)
    // if(note)
    // {
    //    response.json(note)
    // }
    // else 
    // {
    //   response.status(404).end()
    // }
    Note.findById(request.params.id).then(note=>{
      response.json(note)
    })
    .catch(error=>next(error))

  })

  app.get('/api/notes', (request, response)=>{
    // response.json(notes)
    console.log("called get to api notes ")

    Note.find({}).then(notes=>{
      if(notes){
        console.log("notesss : ",notes)
        response.json(notes)
      } else {
        // note does not exist in the database
        response.status(404).end()
      }

    })
    .catch(error=>{
      console.log(error)
      //couls not connect backend to front end
      // response.status(500).end()
      response.status(400).send({error: 'malformatted id'})
    })
  })

  app.delete('/api/notes/:id', (request, response,next)=>{
   
    //old method to delete from backend server
    // const id = Number(request.params.id)
    // note= notes.filter(note=>note.id===id)
    // response.status(204).end()

    // new method to delete from mongodb 
    Note.findByIdAndRemove(request.params.id)
    .then(result=>{
      response.status(204).end()
    })
    .catch(error=>next(error))   
  })

  app.post('/api/notes', (request, response,next)=>{
    console.log("called post to api notes ")
    const body = request.body

    console.log("message : ", body.content)

    
    if(!body.content){
      return response.status(400).json({
        error:'content missing'
      })
    }

    // const note = {
    // content: body.content,
    // important: body.important|| false,
    // date: new Date(),
    // id: generateId()
    // }
    const note = new Note({
      content: body.content,
      important: body.important || false,
    })

    // old method to save note to server
    // notes=notes.concat(note)

    // new mwthod to save note to mongo database
    note.save().then(savedNote=>{
      response.json(savedNote)
    }).catch(error=>next(error))
    

  })

  app.put('/api/notes/:id',(request, response, next)=>{
    const body= request.body

    console.log("put was called here ", body)
    const note={
      content: body.content+" l ",
      important: body.important,
    }
    Note.findByIdAndUpdate(request.params.id, note, {new: true})
    .then(updatedNote=>{
      response.json(updatedNote)
    })
    .catch(error=>next(error))
  })


// const app = http.createServer((request,response)=>{
//     response.writeHead(200,{'Content-Type': 'application/json'})
//     response.end(JSON.stringify(notes))
// })
console.log("processenvportt: ", process.env.PORT )
const PORT = process.env.PORT || 3001

app.listen(PORT)
console.log(`Server is running on the port ${PORT}`)