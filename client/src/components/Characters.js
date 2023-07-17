import React, { useState } from 'react'
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

    return (
        <div>
            {mappedChars}
        </div>
    )
}

export default Characters