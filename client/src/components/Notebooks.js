import NotebookTitle from "./NotebookTitle"

const Notebooks = ( {user} ) => {

    //! map notebook titles here to display in return

    

    return (
        //! will be notebook titles below as a variable and mapped above
        <NotebookTitle />
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