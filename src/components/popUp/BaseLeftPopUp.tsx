import React from 'react';
import BasePopUp from "./BasePopUp.tsx";

interface PopupProps {
    isOpen: boolean,
    children?: React.ReactNode;
    id: string;
    nodeName : string;
    closePopUp: () => void;
}

const BaseLeftPopup: React.FC<PopupProps> = ({ isOpen, children, id, nodeName, closePopUp }) => {
    return (
        <BasePopUp isOpen={isOpen} align="left" id={id} nodeName={nodeName} closePopUp={closePopUp}>
            {children}
        </BasePopUp>
    );
};

export default BaseLeftPopup;
