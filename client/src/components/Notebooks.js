import React, { useState, useContext } from 'react'
import Clips from './Clips'
import NotebookTitle from './NotebookTitle'
import { UserContext } from './UserContext'

const Notebooks = ( {notebooksToDisplay, removeNotebook} ) => {

    const [notebookIsSelected, setNotebookIsSelected] = useState(false)
    const [selectedNotebook, setSelectedNotebook] = useState(null)

    const user = useContext(UserContext)

    const handleClick = (data) => {
        setNotebookIsSelected((currentValue) => !currentValue)
        setSelectedNotebook(data)
    }

    const mappedNotebooks = notebooksToDisplay?.map((notebook) => {
        return (
            <NotebookTitle 
                key={notebook.id}
                {...notebook}
                removeNotebook={removeNotebook}
                onClick={() => handleClick(notebook)}
            />
        )
    })

    return (
        <div>
            {notebookIsSelected ?
                <Clips
                    notebook_id={selectedNotebook.id}
                    onClose={handleClick}
                />
                : notebooksToDisplay ? <div>{mappedNotebooks}</div> : null}
        </div>
    )
}

export default Notebooks