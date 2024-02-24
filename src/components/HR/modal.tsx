import React, { ReactNode, useState } from 'react';

interface ModalInterface {
    isOpen : boolean;
    onClose : ()=> void;
    children : ReactNode
}

const Modal : React.FC<ModalInterface> = ({ isOpen  , onClose, children }) => {
  const [isVisible, setIsVisible] = useState(isOpen);
console.log(4444444,isVisible,children);

  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };


if(isOpen) return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* <button className="close-button" onClick={handleClose}>Close</button> */}
        {children}
      </div>
    </div>
  );
};

export default Modal;
