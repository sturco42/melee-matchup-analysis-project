import NotebookTitle from "./NotebookTitle"

const Notebooks = ( {user, notebooksToDisplay} ) => {

    console.log(notebooksToDisplay)
    //! map notebook titles here to display in return
    const mappedNotebooks = notebooksToDisplay.map((notebook) => {
        console.log('our notebook')
        console.log(notebook)
        return (
            <NotebookTitle 
                key={notebook.id}
                {...notebook}
                user={user}
            />
        )
    })

    return (
        //! will be notebook titles below as a variable and mapped above
        <div>
            <div>{mappedNotebooks}</div>
        </div>
    )
}

export default Notebooks