import { useState, useEffect, useRef } from "react"
import Note from "./components/Notes"
import LoginForm from "./components/LoginForm"
import NoteForm from "./components/NoteForm"
import Toggleable from "./components/Toggleable"
import axios from 'axios'
import noteService from './services/notes'
import loginService from './services/login'


const App = () => {

  // const { notes } = props
  // const arr = noteService.getAll()
  const[notes, setNotes] = useState([])
  const[newNote, setNewNote] =useState('add text here..')
  const[showAll, setShowAll] = useState(true)
  const[errorMessage, setErrorMessage] =useState(null)
  const[username, setUsername] = useState('')
  const[password,setPassword] =useState('')
  const[user, setUser] = useState(null)
  const[loginVisible, setLoginVisible] = useState(false)
  const noteFromRef = useRef()


  const handleLogin =async (event)=>{
    event.preventDefault()
    console.log('logging in with', username, password)
    try{


        const user = await loginService.login({username, password,})

        window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(user))
        console.log("user ", user)
        noteService.setToken(user.token)
        setUser(user)
        setUsername('')
        setPassword('')

    } catch(exception){
        setErrorMessage('Wrong Credentials')
        setTimeout(()=>{
          setErrorMessage(null)
        },5000)
    }
  }


 

  
  const noteForm = () => (
    <Toggleable buttonLabel="new note" ref ={noteFromRef}>
    <NoteForm
      createNote={addNote}
      // value={newNote}
      // handleChange={handleNoteChange}
    />
    </Toggleable> 
  )


  const toggleImportanceof =(id) =>{
    // console.log('importance of ${id} needs to be toggled')
    // const url = `http://localhost:3001/notes/${id}`

    const note = notes.find(n=>n.id === id)
    const changedNote ={...note, important: !note.important}
    

    noteService.update(id, changedNote).then(returnedNote =>{
      console.log("returned note ", returnedNote)
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
      console.log("notes intitial", response)
      setNotes(response)
    })    
  },
  [])

  useEffect(()=>{

    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    console.log("our user right now is: ", loggedUserJSON)
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      console.log("and it is parsed as: ", user ,"name: ",user.username, "token:  ", user.token )
      noteService.setToken(user.token)
    }
  },[])

 
  
  const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

  // const handleNoteChange = (event) =>
  // {
  //     console.log(event.target.value)
  //     setNewNote(event.target.value)
  // } 
  const addNote = (noteObject) => {
  
    noteFromRef.current.toggleVisibility()
    noteService.create(noteObject).then(returnedNote=>{
      setNotes(notes.concat(returnedNote))
      setNewNote('add again')
    })
  }


  return (
    <div>
      <h1>Notes</h1>

      {user === null &&   
        <Toggleable buttonLabel='login'>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => {
              // console.log("looking at value in app2: ", target, " ", target.value)
              setUsername(target.value)
            }}
            //to pass value from parent (app2), to children (Login form)
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          {/* <button onClick={() => setLoginVisible(false)}>cancel2</button> */}
        </Toggleable>}
      {user !== null && noteForm()}


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

    </div>
  )
}

export default App