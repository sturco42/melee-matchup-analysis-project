import NotebookTitle from "./NotebookTitle"

const Notebooks = ( {user, notebooksToDisplay} ) => {

    //! map notebook titles here to display in return
    const mappedNotebooks = notebooksToDisplay.map((notebook) => (
        <NotebookTitle 
            key={notebook.id}
            {...notebook}
            user={user}
        />
    ))
    

    return (
        //! will be notebook titles below as a variable and mapped above
        <div>
            <div>mapped notebooks:</div>
            {mappedNotebooks}
        </div>
    )
}

export default Notebooks

    //! how its mapped in profile return
    // {
    //     user?.user_characters.map((user_char) => {
    //         return(
    //         <div>
    //             {user_char?.character?.name}
    //         </div>
    //         )
    //     })
    // }