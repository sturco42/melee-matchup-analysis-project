import React, { useState, useEffect } from 'react'
import CharCard from './CharCard'
import { useHistory, useParams } from 'react-router-dom'
import { Card, Button, Container } from 'semantic-ui-react'

const Characters = ( {charsToDisplay, chars, user, addUserChar, removeUserChar} ) => {
    const history = useHistory()
    const { id } = useParams()

    // const char = () => {
    //     chars.filter()
    // }

    //! Characters
    useEffect(() => {
        fetch('/characters')
            .then((res) => res.json())
            .then(setChars)
            .catch((err) => console.log(err))
        }, [])
    
    //! issue with char here inside of CharCard...
    const mappedChars = charsToDisplay.map((char) => {
        <CharCard key={char.id} {...char} />
    })

    //! Character by id
    useEffect(() => {
        fetch(`/characters/${id}`).then((res) => {
            if (res.ok) {
                res.json().then(setCharacter)
            } else {
                alert('Character Not Found')
            }
        })
    }, [id])

    const handleAddUserChar = () => {
        fetch('/user-characters', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
        }).then((res) => {
            if (res.ok) {
                addUserChar(userChar)
                // what variable is suppsed to be passed here?
            } else {
                alert('Something went wrong')
            }
        })
    }

    const handleRemoveUserChar = () => {
        fetch(`/user-characters/${id}`, { method: 'DELETE' }).then((res) => {
            if (res.ok) {
                removeUserChar(char)
            } else {
                alert('Something went wrong')
            }
        })
    }

    const handleBackToProfile = () => {
        history.push('/profile')
    }
    

    return (
    <Container >
        <Card.Group>
            {mappedChars.map((char) => {
                <Card
                    fluid
                    key={char.props.id}
                    href={`/characters/${char.props.id}`}
                    // className=''
                    // style={{}}
                    onClick={(e) => {
                        e.preventDefault()
                        history.push(`/chars/${char.props.id}`)
                    }}
                    >
                    <Card.Content>
                        <Card.Header>{char.props.name}</Card.Header>
                        {/* <Card.Description>{char.props.icon}</Card.Description> */}
                    </Card.Content>
                </Card>
            })}
        </Card.Group>
    </Container>
    )
}

export default Characters