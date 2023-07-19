import React, { useEffect, useState, useContext } from 'react'
import NoteCard from './NoteCard'
import { UserContext } from './UserContext'

const Notes = ( {id, onClose} ) => {
    const user = useContext(UserContext)
    const [notes, setNotes] = useState([])
    // note data returend from the backend should be in this shape
    const fakeNote = {
        title:null,
        link:null,
        data:{}
    }

    useEffect(() => {
        // fetch notes data by notebook ID
        // on return, run setNotes(response)
        fetch(`/notes/${id}`)
        //! create backend for this route
        .then((res) => res.json())
        .then(setNotes)
        .catch((err) => console.log(err));
    }, [])

    return (
        <>
        {notes.map((note) => {
            return (
                // example note.example below
                <NoteCard
                    title={note.title}
                    youtubeLink={note.link}
                    noteData={note.data}
                />
            )
        })}
        <button>Add Note</button>
        <button onClick={onClose}>Return to Profile</button>
        </>
    )
}

export default Notes