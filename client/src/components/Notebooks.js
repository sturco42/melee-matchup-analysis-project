import React, { useState, useContext } from 'react'
import Clips from './Clips'
import NotebookTitle from './NotebookTitle'
import { UserContext } from './UserContext'
import { useParams } from 'react-router-dom'

const Notebooks = ( {notebooksToDisplay, removeNotebook} ) => {

    const [notebookIsSelected, setNotebookIsSelected] = useState(false)
    const [selectedNotebook, setSelectedNotebook] = useState(null)
    //! NEW
    const [selectedClipId, setSelectedClipId] = useState(null)

    const { clipId } = useParams()

    const user = useContext(UserContext)

    const handleClick = (data, clipId) => {
        setNotebookIsSelected((currentValue) => !currentValue)
        setSelectedNotebook(data)
        setSelectedClipId(clipId)
    }

    const mappedNotebooks = notebooksToDisplay?.map((notebook) => {
        return (
            <NotebookTitle 
                key={notebook.id}
                {...notebook}
                user={user}
                removeNotebook={removeNotebook}
                onClick={() => handleClick(notebook, clipId)}
            />
        )
    })

    return (
        <div>
            {notebookIsSelected ?
                <Clips
                    id={selectedNotebook}
                    clipId={selectedClipId}
                    onClose={handleClick}
                />
                : notebooksToDisplay ? <div>{mappedNotebooks}</div> : null}
        </div>
    )
}

export default Notebooks