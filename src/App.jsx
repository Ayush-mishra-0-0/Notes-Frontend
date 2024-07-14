import Note from './components/Note'
import Error from './components/error'
import { useState, useEffect } from 'react'
import noteservice from './services/note'
import './index.css'

const App = (props) => {
  const [notes, setNotes] = useState([])
  const [newNotes, setnewNotes] = useState('') 
  const [showAll , setshowALL] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  

  const hook = () => {
    console.log('effect')
    noteservice.getAll()
    .then(response => {
        setNotes(response)
      })
  }
  
  useEffect(hook, [])

  const impNotes= showAll?notes : notes.filter(note => note.important === true)
  
  const addNote = event => {
    event.preventDefault()
    const noteObject = {
      content: newNotes,
      important: Math.random() < 0.5,
    }
  
  
    noteservice.create(noteObject)
      .then(response => {
        setNotes(notes.concat(response))
        setnewNotes('')
        console.log(response)
      })
  }

  
  const handleChangeNotes=(e) =>{
       console.log(e.target.value)
       setnewNotes(e.target.value)
  }
  const showImp = () => {
    setshowALL(!showAll)
  }
  const toggleimp = id => {
    const note = notes.find(n => n.id === id)
    const change_imp = { ...note, important: !note.important }
    noteservice.update(id, change_imp)
    .then(
      response=>{
        setNotes(notes.map(note => note.id === id? response : note))
      }
    )
    .catch(error =>{
      setErrorMessage(`Note ${note.content} was already deleted from the server`)
      // alert(`the note ${note.content}was already deleted from the server`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setNotes(notes.filter(n => n.id !== id))
    })
    console.log('importance of ' + id + ' needs to be toggled')
  }


  return (
   <div>
      <h1>Notes</h1>
      <Error message={errorMessage} />
      <div>
        <button onClick={() => showImp(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>      
      <ul>
        {impNotes.map(note => 
          <Note 
          key={note.id}
          note={note}
          toogleimp={()=> toggleimp(note.id)} />
        )}
      </ul>
      <form onSubmit={addNote}>
      <input
          value={newNotes}
          onChange={handleChangeNotes}
        />
        <button type="submit">save</button>
      </form> 
    </div>
  )
}

export default App 