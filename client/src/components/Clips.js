import React, { useEffect, useState, useContext } from 'react'
import ClipCard from './ClipCard'
import { UserContext } from './UserContext'
import ClipForm from './ClipForm'

const Clips = ( {notebook_id, onClose} ) => {
    const user = useContext(UserContext)
    const [clips, setClips] = useState([])
    
    useEffect(() => {
        fetch(`/notebooks/${notebook_id}/clips`)
        .then((res) => res.json())
        .then(setClips)
        .catch((err) => console.log(err));
    }, [notebook_id])

    const handleDeleteClip = (clipId) => {
        // Make the DELETE request using the clipId and notebook id (id)
        fetch(`/notebooks/${notebook_id}/clips/${clipId}`, {
            method: 'DELETE',
        })
            .then((res) => {
                // Handle the response, e.g., update the state to reflect the deletion
                if (res.status === 204) {
                    alert('Successfully deleted clip')
                // Deletion successful, update the state to remove the deleted clip
                // You can either fetch the updated clips or remove it from the state manually
                } else {
                // Handle the error if deletion fails
                }
            })
            .catch((err) => {
            //! Handle any errors in the DELETE request needs to be doen
            });
        };

    
    const mappedClips = clips.map((clip) => {
        return (
            <ClipCard
                key={clip.id}
                {...clip}
                onDelete={handleDeleteClip}
            />
        )
    })

    return (
        <>
            <ClipForm notebook_id={notebook_id} />
            <div>
            {mappedClips}
            </div>
            <button onClick={onClose}>Return to Profile</button>
        </>
    )
}

export default Clips