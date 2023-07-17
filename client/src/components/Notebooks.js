import NotebookTitle from "./NotebookTitle"

const Notebooks = ( {user} ) => {

    //! map notebook titles here to display in return

    // {
    //     user?.user_characters.map((user_char) => {
    //         return(
    //         <div>
    //             {user_char?.character?.name}
    //         </div>
    //         )
    //     })
    // }

    return (
        //! will be notebook titles below as a variable and mapped above
        <NotebookTitle />
    )
}

export default Notebooks