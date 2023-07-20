// imports
import React, { useState } from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import ClipModal from './ClipModal';

const ClipCard = ( {title, link, notes} ) => {
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(currentValue => !currentValue)
  }

  return (
    <>
      <button onClick={handleClick} >{title}</button>
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
