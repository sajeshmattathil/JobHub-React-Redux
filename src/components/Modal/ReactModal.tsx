import React, { useState } from 'react';
import Modal from 'react-modal';

// Modal component
const MyModal = ({ isOpen, onClose }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Example Modal"
        >
            <h2>Hello Modal</h2>
            <button onClick={onClose}>Close Modal</button>
        </Modal>
    );
};

// Parent component
const ReactModal = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return ( 
        <div>
            <h1>React Modal Example</h1>
            <button onClick={openModal}>Open Modal</button>
            <MyModal isOpen={modalIsOpen} onClose={closeModal} />
        </div>
    );
};

export default ReactModal;
