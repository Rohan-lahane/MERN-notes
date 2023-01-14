import { useState, useEffect } from "react"
import Note from "./Notes"
import axios from 'axios'
import noteService from './services/notes'

const App = () => {

  // const { notes } = props
  const[notes, setNotes] = useState([])
  const[newNote, setNewNote] =useState('add text here..')
  const[showAll, setShowAll] = useState(true)

  const toggleImportanceof =(id) =>{
    // console.log('importance of ${id} needs to be toggled')
    // const url = `http://localhost:3001/notes/${id}`

    const note = notes.find(n=>n.id === id)
    const changedNote ={...note, important: !note.important}

    noteService.update(id, changedNote).then(returnedNote =>{
      
      setNotes(notes.map(note => note.id!==id? note: returnedNote))
      //set response data where id matches the passed id,
      //everywhere else keep the note the same. 
    })
    .catch(error=>{
    alert(
      `the note '${note.content}' was already deleted from server`
    )
    setNotes(notes.filter(n=>n.id!==id))
    })
  }

  useEffect(()=>{
    console.log('effect')
    noteService.getAll().then(response=>{
      setNotes(response)
    })    
  },
  [])
  
  const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

  const handleNoteChange= (event) =>
  {
      console.log(event.target.value)
      setNewNote(event.target.value)
  } 
  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      
    }

    noteService.create(noteObject).then(returnedNote=>{
      setNotes(notes.concat(returnedNote))
      setNewNote('add again')
    })
  }


  return (
    <div>
      <h1>Notes</h1>

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>

      <ul>
        {notesToShow.map(note2 => 
        <Note key={note2.id}
          note ={note2}
          toggleImportance={()=>toggleImportanceof(note2.id)}
        />
         
        )}
      </ul>

      <form onSubmit ={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button type ="submit">save</button>
      </form>


    </div>
  )
}

export default App