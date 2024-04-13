import { ReactNode, useEffect, useState } from 'react';

interface ModalInterface {
    isOpen: boolean;
    onClose: (x: number | string) => void;
    children: ReactNode;
}

const Modal: React.FC<ModalInterface> = ({ isOpen, onClose, children }) => {
    const [isVisible, setIsVisible] = useState(isOpen);

    useEffect(() => {
        setIsVisible(isOpen);
    }, [isOpen]);

    const handleClose = () => {
        setIsVisible(false);
        onClose(0);
    };

    return (
        isVisible && (
            <div className="modal-overlay" onClick={handleClose}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                  
                    {children}
                </div>
            </div>
        )
    );
};

export default Modal;
