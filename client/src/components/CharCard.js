import React, { useState } from 'react'
import { Button, Card, CardContent, Container } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'

const CharCard = ({ name, id, user, addUserChar, removeUserChar, addNotebook }) => {
    const [char, setChar] = useState([])
    const history = useHistory()
    const [errors, setErrors] = useState([])

    const handleAddMain = () => {
        fetch('/user-characters', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
        })
        .then((res) => {
            if (res.ok) {
                const characterToAdd = {
                    character: { name: name },
                    id: id,
                    user_id: user.id,
                }
                addUserChar(characterToAdd)
            } else {
                alert('Something went wrong')
            }
        })
    }

    const handleRemoveMain = () => {
        fetch(`/user-characters/${id}`, { method: 'DELETE' }).then((res) => {
            if (res.ok) {
                const characterUserId = user?.user_characters.find(
                    (character) => character?.character?.name === name
                )?.id
                removeUserChar(characterUserId)
                alert('Successfully removed main')
            } else {
                alert('Something went wrong')
            }
        })
    }

    const handleAddNotebook = () => {
        fetch('/notebooks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
        })
        .then((res) => {
            if (res.ok) {
                res.json().then((data) => addNotebook(data))
            } else {
                alert('Notebook for that character already exists')
            }
        })
        .catch(errors)
    }

    if (!char) return 'Loading...'

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
            <Button onClick={handleAddNotebook}>Create Notebook</Button>
            {/* <Button onClick={handleDeleteNotebook}>Delete Notebook</Button> */}
        </div>
    )
}

export default CharCard