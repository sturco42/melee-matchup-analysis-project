import React, {useState, useContext} from 'react'
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
    
    // console.log(notebooksToDisplay)
    //! map notebook titles here to display in return
    const mappedNotebooks = notebooksToDisplay?.map((notebook) => {
        // console.log('our notebook')
        // console.log(notebook)
        return (
            <NotebookTitle 
                key={notebook.id}
                {...notebook}
                user={user}
                removeNotebook={removeNotebook}
                onClick={handleClick}
            />
        )
    })

    return (
        //! will be notebook titles below as a variable and mapped above
        <div>
            {notebookIsSelected ? <Clips id={selectedNotebook} onClose={handleClick} /> : notebooksToDisplay ? <div>{mappedNotebooks}</div> : null}
        </div>
    )
}

export default Notebooks