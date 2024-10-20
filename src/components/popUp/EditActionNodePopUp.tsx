import React, {useCallback, useState} from "react";
import BaseLeftPopup from "./BaseLeftPopUp.tsx";

interface EditActionNodePopUpProps {
    isOpen: boolean;
    id: string;
    nodeName : string;
    closePopUp: () => void;
    setNodeName: (name: string) => void;
    onDelete: () => void;
}

const EditActionNodePopUp: React.FC<EditActionNodePopUpProps> = ({isOpen, id, nodeName , closePopUp, setNodeName, onDelete}) => {
    const [inputNodeName, setInputNodeName] = useState(nodeName);
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputNodeName(event.target.value);
    };
    const onSubmit = useCallback(() => {
        setNodeName(inputNodeName);
        closePopUp();
    }, [inputNodeName])

    return (
        <BaseLeftPopup isOpen={isOpen}>
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


            <div className="mb-6">
                <label className="block mb-2 text-gray-700">Action Name</label>
                <input
                    type="text"
                    className="w-full border rounded p-2"
                    onChange={handleInputChange}
                    value={inputNodeName}
                />
            </div>

            <div className="flex justify-between mt-6">
                <button
                    className="text-red-500 border border-red-500 px-4 py-2 rounded hover:bg-red-50"
                    onClick={onDelete}
                >
                    Delete
                </button>
                <div>
                    <button
                        className="px-4 py-2 mr-2 border rounded hover:bg-gray-100"
                        onClick={closePopUp}
                    >
                        Cancel
                    </button>
                    <button onClick={onSubmit}
                            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
                        Save
                    </button>
                </div>
            </div>
        </BaseLeftPopup>

    )
}

export default EditActionNodePopUp;