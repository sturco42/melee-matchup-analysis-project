import React, { useState } from 'react'
import CharCard from './CharCard'
import { useHistory, useParams } from 'react-router-dom'
// import { Card, Button, Container, CardContent } from 'semantic-ui-react'

const Characters = ( {charsToDisplay, user, addUserChar, removeUserChar, updateNotebooks} ) => {
    const history = useHistory()
    const { id } = useParams()
    const [main, setMain] = useState(false)
    
    
    const mappedChars = charsToDisplay.map((char) => {
        return (
            <CharCard
                key={char.id}
                updateNotebooks={updateNotebooks}
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