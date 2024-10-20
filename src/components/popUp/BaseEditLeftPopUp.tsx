import React from 'react';
import BasePopUp from "./BasePopUp.tsx";

interface PopupProps {
    isOpen: boolean,
    children?: React.ReactNode;
    id: string;
    nodeName : string;
    closePopUp: () => void;
}

const BaseLeftPopup: React.FC<PopupProps> = ({ isOpen, children, id = "", nodeName, closePopUp }) => {
    return (
        <BasePopUp isOpen={isOpen} align="left">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className="text-xl font-semibold">Action</h2>
                    <h2 className="">{nodeName}</h2>
                    <h2 className="text-xl font-semibold text-gray-500">{id}</h2>
                </div>
                <div>
                    <button
                        className="text-gray-500 hover:text-gray-800"
                        onClick={closePopUp}
                    >
                        ✖
                    </button>
                </div>
            </div>
            {children}
        </BasePopUp>
    );
};

export default BaseLeftPopup;

