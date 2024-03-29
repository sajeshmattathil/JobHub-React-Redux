import  { useState } from 'react';
import Modal from './modal';

const ShowModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleModal = () => {
    setIsOpen(!isOpen);    
  };

  return (
    <div>
      <button onClick={handleToggleModal}>Open Modal</button>
      <Modal isOpen={isOpen} onClose={handleToggleModal}>
        <h2>Modal Content</h2>
        <p>This is the content of the modal.</p>
      </Modal>
    </div>
  );
};

export default ShowModal;
