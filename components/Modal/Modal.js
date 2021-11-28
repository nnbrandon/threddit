import React, {useEffect, useRef} from 'react';

import styles from './Modal.module.scss';

function Modal({children, onClose, size}) {
    const wrapperRef = useRef(null);
    const innerRef = useRef(null);

    let modalSize
    switch (size) {
        case "small":
            modalSize = styles.smallModalBox;
            break;
        case "normal":
            modalSize = styles.normalModalBox;
            break;
        default:
            modalSize = styles.normalModalBox;
            break;
    }
    
    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && wrapperRef.current.contains(event.target)
                && innerRef.current && !innerRef.current.contains(event.target)) {
                onClose();
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef, innerRef, onClose]);

    return (
        <div ref={wrapperRef} className={styles.container}>
            <div className={styles.modalContainer}>
                <div ref={innerRef} className={modalSize}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Modal;
