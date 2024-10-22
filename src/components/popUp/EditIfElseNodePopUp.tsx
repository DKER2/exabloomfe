import React, {useCallback, useState} from "react";
import BaseEditLeftPopUp from "./BaseEditLeftPopUp.tsx";

interface EditIfElseNodePopUp {
    isOpen: boolean;
    id: string;
    nodeName : string;
    closePopUp: () => void;
    setNodeName: (name: string) => void;
    onDelete: () => void;
    addConditions?: (conditions: string[]) => void;
    setConditions: (conditions: string[]) => void;
    conditions: string[]
}

const EditIfElseNodePopUp: React.FC<EditIfElseNodePopUp> = ({isOpen, id, nodeName , closePopUp, setNodeName, onDelete, setConditions, conditions}) => {
    const [inputNodeName, setInputNodeName] = useState(nodeName);
    const handleInputNodeNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputNodeName(event.target.value);
    };
    const [inputConditions, setInputConditions] = useState<string[]>(conditions)

    const handleInputBranchNameChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newBranchNames = [...inputConditions];
        newBranchNames[index] = event.target.value;
        setInputConditions(newBranchNames);
    }
    const onSubmit = useCallback(() => {
        setNodeName(inputNodeName);
        setConditions(inputConditions)
        closePopUp();
    }, [inputNodeName, inputConditions])

    return (
        <BaseEditLeftPopUp isOpen={isOpen} id={id} closePopUp={closePopUp} nodeName={nodeName}>
            <div className="flex flex-col justify-between h-full">
                <div>
                    <label className="block mb-2 text-gray-700">Action Name</label>
                    <input
                        type="text"
                        className="w-full border rounded p-2"
                        onChange={handleInputNodeNameChange}
                        value={inputNodeName}
                    />
                </div>
                <div>
                    <div className="text-bold">
                        Branches
                    </div>
                    <div>
                        {inputConditions.map(((condition, index) => {
                            return (
                                <input
                                type="text"
                                className="w-full border rounded p-2"
                                onChange={(e) => handleInputBranchNameChange(e, index)}
                                value={condition}/>
                            );
                        }))}
                    </div>
                    <div>
                        <button onClick={() => setInputConditions([...inputConditions.slice(0, inputConditions.length - 1), "", inputConditions[inputConditions.length - 1]])}>
                            + add branch
                        </button>
                    </div>
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

export default EditIfElseNodePopUp;