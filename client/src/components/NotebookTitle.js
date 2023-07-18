// imports

const NotebookTitle = ( {user, id, character} ) => {
    console.log(character)

    const handleClick = () => {

    }
    return (
        <div>
           <button onClick={handleClick}> {character.name}</button>
        </div>
    )
}

export default NotebookTitle