// imports
import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'

const NotebookTitle = ( {user, id, character, removeNotebook, onClick} ) => {
    // console.log(character)
    // const [note, setNote] = useState({notebooks:[]})
    const [error, setError] = useState(null)
    // const {noteId} = useParams()
    const history = useHistory()
    
    const handleOnClick = () => {
        onClick(id)
    }

    // useEffect(() => {
    //     fetch(`/notebooks/${id}`)
    //     .then(res => {
    //         if (res.ok) {
    //             res.json().then(setNote)
    //         } else {
    //             res.json().then(error => setError(error.message))
    //         }
    //     })
    //     .catch(console.error)
    // }, [id])

    const handleDeleteNotebook = () => {
        fetch(`/notebooks/${id}`, { method: 'DELETE' }).then((res) => {
            // return (console.log(id))
            if (res.ok) {
                // const notebookId = parseInt(id)
                removeNotebook(id)
                history.push('/notebooks')
                alert('Successfully removed notebook')
            }   else {
                res.json().then(error => setError(error.message))
                alert('Something went wrong')
            }
        })
        .catch(console.error)
    }
    
    if(error) return <h3>{error}</h3>

    return (
        <div>
           <button onClick={handleOnClick}>{character.name}</button>
           <button onClick={handleDeleteNotebook}>Delete Notebook</button>
        </div>
    )
}

export default NotebookTitle