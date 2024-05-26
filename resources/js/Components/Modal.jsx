import React, { useEffect, useRef, useState } from 'react';

export default function Modal({ children, show = false, onClose = () => {}, centered = true }) {
    const modalRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const modalElement = modalRef.current;
        const modalInstance = new bootstrap.Modal(modalElement, { centered });

        if (show) {
            modalInstance.show();
            setIsOpen(true);
        } else {
            modalInstance.hide();
            setIsOpen(false);
        }

        return () => {
            modalInstance.dispose(); // Clean up modal instance when component unmounts
        };
    }, [show, centered]);

    const handleClose = () => {
        onClose();
        setIsOpen(false); // Update local state when modal is closed
    };

    useEffect(() => {
        // Remove 'modal-open' class from body when modal is closed
        // if (!isOpen) {
        //     document.body.classList.remove('modal-open');
        // }

    }, [isOpen]);

    const handleBackdropClick = (event) => {
        // Check if the click was on the modal backdrop
        if (event.target === modalRef.current && !isOpen) {
            setIsOpen(true); // Reopen the modal if clicked outside and it's closed
        }
    };

    return (
        <div
            className={`modal fade ${isOpen ? 'show' : ''}`}
            ref={modalRef}
            tabIndex="-1"
            aria-labelledby="modalLabel"
            aria-hidden={!isOpen}
            onClick={handleBackdropClick}
        >
            <div className={`modal-dialog ${centered ? 'modal-dialog-centered' : ''}`}>
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button>
                    </div>
                    <div className="modal-body">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
