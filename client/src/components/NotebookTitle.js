// imports
import React from 'react'
import Notebooks from "./Notebooks"

const NotebookTitle = ( {user, id, character, removeNotebook} ) => {
    // console.log(character)

    const consoleLog = () => {
        return ((console.log(id)))
    }

    const handleDeleteNotebook = (id) => {
        fetch(`/notebooks/${id}`, { method: 'DELETE' }).then((res) => {
            // return (console.log(id))
            if (res.ok) {
                const notebookId = parseInt(id)
                removeNotebook(notebookId)
                alert('Successfully removed notebook')
            }   else {
                alert('Something went wrong')
            }
        })
    }

    const handleClick = () => {
    }

    return (
        <div>
           <button onClick={consoleLog}> {character.name}</button>
           <button onClick={() => handleDeleteNotebook(id)}>Delete Notebook</button>
        </div>
    )
}

export default NotebookTitle