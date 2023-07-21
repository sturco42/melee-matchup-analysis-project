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
            .catch((error) => {
            //! Handle any errors in the DELETE request needs to be doen
            });
        };

        // clipObjectData should look something like 
        // clipObjectData = {
        //     notes: 'theUpdateNoteData',
        //     link: 'theUpdateLinkData',
        //     title: 'theUpdataTitleData'
        // }
        const handleUpdateClip = (clipId, clipObjectData) => {
            fetch(`/notebooks/${notebook_id}/clips/${clipId}`, {
                method: 'PATCH',
                //body: JSON.stringify(clipObjectData),
            })
            .then((res) => {
                if (res.status === 200) {
                    alert('Successfully updated clip')
                    handleFetchUpdatedClips()
                } else {
                    //handle error
                }
            })
            .catch((error) => {
                //! handle errors
            })
        }

        const handleFetchUpdatedClips = () => {
            // fetch the updated clips from the backend, just like we do in useEffect on clips.js line 11
            // just like in use effect above, update our state with the new clips
            // e.g. 
            fetch(`/notebooks/${notebook_id}/clips`)
        .then((res) => res.json())
        .then(setClips)
        .catch((err) => console.log(err));
        }
    
    const mappedClips = clips.map((clip) => {
            return (
                <ClipCard
                    key={clip.id}
                    {...clip}
                    onDelete={handleDeleteClip}
                    onUpdate={handleUpdateClip}
                    notebook_id={notebook_id}
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