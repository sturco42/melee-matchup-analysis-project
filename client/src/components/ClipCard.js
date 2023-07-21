// imports
import React, { useState } from 'react'
// import { Button, Header, Image, Modal } from 'semantic-ui-react'
import ClipModal from './ClipModal';
import UpdateClipForm from './UpdateClipForm';

const ClipCard = ( {title, link, notes, onDelete, id, notebook_id, onUpdate} ) => {
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(currentValue => !currentValue)
  }

  const handleDelete = () => {
    onDelete(id)

  }

  const handleUpdate = () => {
    // we need to pass to onUpdate the following props
    // clipId, clipObject = {link:'updateLink', notes:'updateNotes', title:'updatedTitle}
    // then call onUpdate(clipId, clipObject)
    onUpdate()
  }

  return (
    <>
      <div>
        <button onClick={handleClick} >{title}</button>
        <button onClick={handleDelete}>Delete Clip</button>
        {/* <UpdateClipForm handleUpdate={handleUpdate} clip={clip} /> */}
        <button>Edit Clip</button>
      </div>
      <ClipModal
        open={open}
        handleClick={handleClick}
        title={title}
        link={link}
        notes={notes}
      />
    </>
  );
};

export default ClipCard
