import React from 'react';
import BasePopUp from "./BasePopUp.tsx";

interface PopupProps {
    isOpen: boolean,
    children?: React.ReactNode;
}

const BaseLeftPopup: React.FC<PopupProps> = ({ isOpen, children}) => {
    return (
        <BasePopUp isOpen={isOpen} align="left">
            {children}
        </BasePopUp>
    );
};

export default BaseLeftPopup;
