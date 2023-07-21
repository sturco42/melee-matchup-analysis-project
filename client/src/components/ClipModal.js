import React from 'react'
import { Modal } from 'semantic-ui-react'

const ClipModal = ( {title, link, notes, open, handleClick}) => {
    
    const createMarkup = (htmlString) => {
        return { __html: htmlString };
    };

    // const handleEditNotes = () => {
    //     console.log('logic for edit')
    // }

    return (
        <Modal
            open={open}
            onClose={handleClick}
        >
            <Modal.Header>{title}</Modal.Header>
            <Modal.Content>
                <div dangerouslySetInnerHTML={createMarkup(link)}/>
                <Modal.Description>{notes}</Modal.Description>
            </Modal.Content>
        </Modal>
    )
}

export default ClipModal