import React, { ReactNode, useState } from 'react';

interface ModalInterface {
    isOpen : boolean;
    onClose : ()=> void;
    children : ReactNode
}

const Modal : React.FC<ModalInterface> = ({ isOpen  , onClose, children }) => {
  const [isVisible, setIsVisible] = useState(isOpen);

  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };


if(isOpen) return (
    <div className="modal-overlay" onClick={handleClose}
    style={{
      marginTop: "5%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "1vh",
      backgroundColor: "rgb(240, 220, 220)",
      width :'25%',
      margin : '30vh',
      marginLeft : "25%",
      zIndex: '1000',
      position: 'fixed',

    }}
    >
      <div className="modal-content items-center justify-center" onClick={(e) => e.stopPropagation()}
         style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
          justifyContent :'center',
          alignItems : 'center'
        }}
      >

        {/* <button className="close-button" onClick={handleClose}>Close</button> */}
        {children}
      </div>
    </div>
  );
};

export default Modal;
