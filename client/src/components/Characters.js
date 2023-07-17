import React, { useState, useEffect } from 'react'
import CharCard from './CharCard'
import { useHistory, useParams } from 'react-router-dom'
// import { Card, Button, Container, CardContent } from 'semantic-ui-react'

const Characters = ( {charsToDisplay, chars, setChars, user, addUserChar, removeUserChar} ) => {
    const history = useHistory()
    const { id } = useParams()
    const [main, setMain] = useState(false)
    
    
    const mappedChars = charsToDisplay.map((char) => {
        return (
            <CharCard
                key={char.id}
                {...char}
                addUserChar={addUserChar}
                removeUserChar={removeUserChar}
                user={user}
            />
        )
    })

    //! Character by id
    // useEffect(() => {
    //     fetch(`/characters/${id}`).then((res) => {
    //         if (res.ok) {
    //             res.json().then(setChars)
    //         } else {
    //             alert('Character Not Found')
    //         }
    //     })
    // }, [id])

    

    const handleBackToProfile = () => {
        history.push('/profile')
    }
    
    return (
        <div>{mappedChars}</div>
    )
}

export default Characters