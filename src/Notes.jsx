import React from 'react'
// import ReactDOM from 'react-dom/client'



const Note = ({note, toggleImportance}) => {
   
  const label = note.important ? 'make not important' : 'make important'
  
  return (
        <li>
        {note.content}
        <button onClick ={toggleImportance}>{label}</button>
        </li>
    )
  }
  
  export default Note