import React from 'react';
import ReactDOM from 'react-dom';

interface PopupProps {
    isOpen: boolean;
    closePopup: () => void;
    onSubmit: () => void;
    children?: React.ReactNode;
}

const BaseLeftPopup: React.FC<PopupProps> = ({ isOpen, closePopup, onSubmit }) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex justify-end">
            {/* Modal Content */}
            <div className="bg-white w-[600px] h-full rounded-l-lg shadow-xl p-6 relative">
                {/* Close Button */}
                <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                    onClick={closePopup}
                >
                    ✖
                </button>

                {/* Modal Content */}
                <h2 className="text-xl font-semibold mb-4">Action</h2>
                <div className="mb-6">
                    <label className="block mb-2 text-gray-700">Action Name</label>
                    <input
                        type="text"
                        className="w-full border rounded p-2"
                        placeholder="Update contact"
                    />
                </div>

                <button className="text-blue-500 underline mb-4">+ Add field</button>

                {/* Footer Buttons */}
                <div className="flex justify-between mt-6">
                    <button
                        className="text-red-500 border border-red-500 px-4 py-2 rounded hover:bg-red-50"
                        onClick={() => alert('Deleted')}
                    >
                        Delete
                    </button>
                    <div>
                        <button
                            className="px-4 py-2 mr-2 border rounded hover:bg-gray-100"
                            onClick={closePopup}
                        >
                            Cancel
                        </button>
                        <button onClick={onSubmit}
                                className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>,
        document.getElementById('popup-root') as HTMLElement
    );
};

export default BaseLeftPopup;
