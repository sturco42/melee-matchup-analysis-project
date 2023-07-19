import React, { useEffect, useState, useContext } from 'react'
import ClipCard from './ClipCard'
import { UserContext } from './UserContext'

const Clips = ( { id, onClose } ) => {
    const user = useContext(UserContext)
    const [clips, setClips] = useState([])
    // note data returend from the backend should be in this shape
    
    const fakeNote = {
        title:null,
        link:null,
        data:{}
    }

    useEffect(() => {
        // fetch clips data by notebook ID
        // on return, run setClips(response)
        fetch(`/notebooks/${id}clips/`)
        //! create backend for this route
        .then((res) => res.json())
        .then(setClips)
        .catch((err) => console.log(err));
    }, [])

    return (
        <>
            {/* {clips?.map((clip) => {
                return (
                    // example clip.example below
                    <ClipCard
                        title={clip.title}
                        link={clip.link}
                        notes={clip.notes}
                    />
                )
            })} */}
            <button>Add clip</button>
            <button onClick={onClose}>Return to Profile</button>
        </>
    )
}

export default Clips