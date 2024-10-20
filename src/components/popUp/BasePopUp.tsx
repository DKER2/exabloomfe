import React from 'react';
import ReactDOM from 'react-dom';

interface PopupProps {
    isOpen: boolean,
    children?: React.ReactNode;
    align?: 'left' | 'center' | 'right';
}

const BasePopUp: React.FC<PopupProps> = ({ isOpen, children, align = "center"  }) => {
    if (!isOpen) return null;
    const alignClassName = ((align: string) => {
        if(align == 'left') {
            return "justify-start"
        } else if (align == 'center') {
            return "justify-center"
        } else if (align == 'right') {
            return "justify-end"
        }
    })(align)


    return ReactDOM.createPortal(
        <div className={"fixed inset-0 bg-black bg-opacity-30 z-50 flex " + alignClassName}>
            <div className="bg-white w-[600px] h-full rounded-l-lg shadow-xl p-6 relative">
                {children}
            </div>
        </div>,
        document.getElementById('popup-root') as HTMLElement
    );
};

export default BasePopUp;
