import React from 'react';
import ReactDOM from 'react-dom';

interface PopupProps {
    isOpen: boolean,
    children?: React.ReactNode;
}

const BaseLeftPopup: React.FC<PopupProps> = ({ isOpen, children }) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex justify-end">
            {children}
        </div>,
        document.getElementById('popup-root') as HTMLElement
    );
};

export default BaseLeftPopup;
