const Note = ({ note , toogleimp}) => {
  const label= note.important ?
  'make not important' : 'make important'
    return (
      <li>
        {note.content}
        <button onClick={toogleimp}>{label}</button>
      </li>
    )
  }
  
  export default Note