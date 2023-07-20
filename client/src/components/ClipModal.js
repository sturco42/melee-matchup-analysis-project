import React, { useState } from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'

const ClipModal = ( {title, link, notes, open, handleClick}) => {
    
    const createMarkup = (htmlString) => {
        return { __html: htmlString };
    };

    const handleEditNotes = () => {
        console.log('logic for edit')
    }

    return (
        <Modal
            open={open}
            onClose={handleClick}
        >
            <Modal.Header>{title}</Modal.Header>
            <Modal.Content>
                <div dangerouslySetInnerHTML={createMarkup(link)}/>
                {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/WbccsiviTc0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen>hello</iframe> */}
                <Modal.Description>{notes}</Modal.Description>
                <Button onClick={handleEditNotes}>Edit Notes</Button>
            </Modal.Content>
        </Modal>
    )
}

export default ClipModal