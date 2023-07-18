// imports
import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'

const NotebookTitle = ( {user, id, character, removeNotebook} ) => {
    // console.log(character)
    const [note, setNote] = useState({notebooks:[]})
    const [error, setError] = useState(null)
    const {noteId} = useParams()
    const history = useHistory()
    
    const consoleLog = () => {
        return ((console.log(id)))
    }

    useEffect(() => {
        fetch(`/notebooks/${noteId}`)
        .then(res => {
            if (res.ok) {
                res.json().then(setNote)
            } else {
                res.json().then(error => setError(error.message))
            }
        })
        .catch(console.error)
    }, [noteId])

    const handleDeleteNotebook = (e) => {
        fetch(`/notebooks/${noteId}`, { method: 'DELETE' }).then((res) => {
            // return (console.log(id))
            if (res.ok) {
                // const notebookId = parseInt(id)
                removeNotebook(noteId)
                history.push('/notebooks')
                alert('Successfully removed notebook')
            }   else {
                res.json().then(error => setError(error.message))
                alert('Something went wrong')
            }
        })
        .catch(console.error)
    }

    const handleClick = () => {
    }
    
    if(error) return <h3>{error}</h3>

    return (
        <div>
           <button onClick={consoleLog}> {character.name}</button>
           <button onClick={handleDeleteNotebook}>Delete Notebook</button>
        </div>
    )
}

export default NotebookTitle