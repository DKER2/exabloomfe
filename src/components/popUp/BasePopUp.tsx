import React from 'react';
import ReactDOM from 'react-dom';

interface PopupProps {
    isOpen: boolean,
    children?: React.ReactNode;
    align?: 'left' | 'center' | 'right';
    id: string;
    nodeName : string;
    closePopUp: () => void;
}

const BasePopUp: React.FC<PopupProps> = ({ isOpen, children, align = "center", nodeName, id, closePopUp  }) => {
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
            <div className="bg-white flex flex-col w-[600px] h-full rounded-l-lg shadow-xl p-6 relative">
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
                <div className="flex-auto">
                    {children}
                </div>
            </div>
        </div>,
        document.getElementById('popup-root') as HTMLElement
    );
};

export default BasePopUp;
