const Notes = ({notes}) => {

    return (
        <>
    
        {notes.map((note) => {
            return (
                <NoteCard title={note.title} youtubeLink={note.link} noteData={note.data}/>
                
            )
        })}
        <button> add Note</button> 
        </>
    )
}