import React, { useEffect, useState } from 'react';
import { Button } from 'semantic-ui-react'
import { useParams, useHistory } from 'react-router-dom'

const CharCard = ({ name, id, key, user, addUserChar, removeUserChar }) => {
    // const { id } = useParams()
    const [char, setChar] = useState([])
    const history = useHistory()
    
    // useEffect(() => {
    //     fetch(`/characters/${id}`)
    //     .then(res => {
    //         if (res.ok) {
    //             res.json().then(setChar)
    //         } else {
    //             res.json().then(e => alert(e.message))
    //         }
    //     })
    //     .catch(console.error)
    // }, [id])
    
    const handleAddMain = () => {
    // character should look like
    // {
    //   character: {name: 'something'},
    //   id: 999,
    //   user_id: 666
    // }
        fetch('/user-characters', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ id })
        })
        .then((res) => {
            if (res.ok) {
                const characterToAdd = {
                    character: {name: name},
                    id: id,
                    user_id: user.id
                }
                addUserChar(characterToAdd)
            } else {
                alert('Something went wrong')
            }
        })
    }
    
    const handleRemoveMain = () => {
        // the ID here is the general id of the character e.g. 14 of kirby
        // This works because on the backend we match on character ID and user ID (so we don't need the specific 214 id)
        fetch(`/user-characters/${id}`, {method: 'DELETE'})
        .then((res) => {
            if (res.ok) {
                // we need to get the specific character user id (e.g. 214 or something for kirby) because that is how we match and remove from our react state
        const characterUserId = user?.user_characters.find((character) => character?.character?.name === name)?.id
                removeUserChar(characterUserId)
                alert('Successfully removed main')
            } else {
                alert('Something went wrong')
            }
        })
    }

    if (!char) return 'Loading...'
    // Mains is switching form
    const mains = user?.user_characters?.map((main) => main.character) || []

    const charIsMain = mains.find((character) => character?.name === name) !== undefined

    return (
      <div>
        {name}
        {!charIsMain ? (
          <Button onClick={handleAddMain}>+</Button>
        ) : (
          <Button onClick={handleRemoveMain}>-</Button>
        )}
      </div>
    )
}

export default CharCard