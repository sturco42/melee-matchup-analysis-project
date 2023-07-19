import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const NotebookTitle = ( {id, character, removeNotebook, onClick} ) => {
    const [error, setError] = useState(null)
    
    const history = useHistory()
    
    const handleOnClick = () => {
        onClick(id)
    }

    const handleDeleteNotebook = () => {
        fetch(`/notebooks/${id}`, { method: 'DELETE' }).then((res) => {
            if (res.ok) {
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