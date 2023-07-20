import React, { useState, useContext } from 'react'
import Clips from './Clips'
// import ClipCard from './ClipCard'
import NotebookTitle from './NotebookTitle'
import { UserContext } from './UserContext'
// import { useParams } from 'react-router-dom'

const Notebooks = ( {notebooksToDisplay, removeNotebook} ) => {

    const [notebookIsSelected, setNotebookIsSelected] = useState(false)
    const [selectedNotebook, setSelectedNotebook] = useState(null)
    //! NEW
    // const [selectedClipId, setSelectedClipId] = useState(null)

    // const { clipId } = useParams()

    const user = useContext(UserContext)

    const handleClick = (data) => {
        setNotebookIsSelected((currentValue) => !currentValue)
        setSelectedNotebook(data)
        // setSelectedClipId(clipId)
    }

    const mappedNotebooks = notebooksToDisplay?.map((notebook) => {
        return (
            <NotebookTitle 
                key={notebook.id}
                {...notebook}
                removeNotebook={removeNotebook}
                // took out clipId from paramater below
                onClick={() => handleClick(notebook)}
            />
        )
    })

    return (
        <div>
            {notebookIsSelected ?
                <Clips
                    notebook_id={selectedNotebook.id}
                    // clipId={selectedClipId}
                    onClose={handleClick}
                />
                : notebooksToDisplay ? <div>{mappedNotebooks}</div> : null}
        </div>
    )
}

export default Notebooks