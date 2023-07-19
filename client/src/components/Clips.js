import React, { useEffect, useState, useContext } from 'react'
import ClipCard from './ClipCard'
import { UserContext } from './UserContext'

const Clips = ( {id, clipId, onClose} ) => {
    const user = useContext(UserContext)
    const [clips, setClips] = useState([])

    useEffect(() => {
        fetch(`/notebooks/${id}clips/${clipId}`)
        .then((res) => res.json())
        .then(setClips)
        .catch((err) => console.log(err));
    }, [id, clipId])

    // const handleDeleteClip = () => {
    //     // Make the DELETE request using the clipId and notebook id (id)
    //     fetch(`/notebooks/${id}/clips/${clipId}`, {
    //         method: 'DELETE',
    //     })
    //         .then((res) => {
    //             // Handle the response, e.g., update the state to reflect the deletion
    //             if (res.status === 204) {
    //             // Deletion successful, update the state to remove the deleted clip
    //             // You can either fetch the updated clips or remove it from the state manually
    //             } else {
    //             // Handle the error if deletion fails
    //             }
    //         })
    //         .catch((err) => {
    //         //! Handle any errors in the DELETE request needs to be doen
    //         });
    //     };
    
    return (
        <>
            {user.notebooks?.clips?.map((clip) => {
                return (
                    // example clip.example below
                    <ClipCard
                        key={clip.id}
                        notebook_id={id}
                        title={clip.title}
                        link={clip.link}
                        notes={clip.notes}
                    />
                )
            })}
            <button>Add clip</button>
            <button onClick={onClose}>Return to Profile</button>
        </>
    )
}

export default Clips