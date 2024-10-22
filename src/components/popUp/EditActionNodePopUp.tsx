import React, {useCallback, useState} from "react";
import BaseEditLeftPopUp from "./BaseEditLeftPopUp.tsx";

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
        <BaseEditLeftPopUp isOpen={isOpen} id={id} closePopUp={closePopUp} nodeName={nodeName}>
            <div className="flex flex-col justify-between h-full">
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
            </div>
        </BaseEditLeftPopUp>

)
}

export default EditActionNodePopUp;