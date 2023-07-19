import React, { useState, useContext } from 'react'
import CharCard from './CharCard'
import { UserContext } from './UserContext'
// import { useHistory, useParams } from 'react-router-dom'
// import { Card, Button, Container, CardContent } from 'semantic-ui-react'

const Characters = ( {charsToDisplay, addUserChar, removeUserChar, addNotebook, removeNotebook} ) => {
    
    const user = useContext(UserContext)

    const mappedChars = charsToDisplay.map((char) => {

        
        return (
            <CharCard
                key={char.id}
                addNotebook={addNotebook}
                removeNotebook={removeNotebook}
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