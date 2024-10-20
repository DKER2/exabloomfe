import React from "react";
import BaseLeftPopup from "./BaseLeftPopUp.tsx";
import NodeItem from "../NodeItem.tsx";
import nodeTypes, {NodeTypes} from "../../consts/nodeTypes.ts";

interface SelectNodePopUpProps {
    isOpen: boolean;
    closePopUp: () => void;
    createInternalNode: (type : NodeTypes) => void;
}

const SelectNodePopUp: React.FC<SelectNodePopUpProps> = ({isOpen , closePopUp, createInternalNode}) => {
    console.log(nodeTypes)
    return (<BaseLeftPopup isOpen={isOpen}>
        <div>
            <div className="flex items-center justify-end mb-4">
                <div>
                    <button
                        className="text-gray-500 hover:text-gray-800"
                        onClick={closePopUp}
                    >
                        ✖
                    </button>
                </div>
            </div>
            {
                Object.entries(nodeTypes).map(([nodeType,]) => (
                    <NodeItem key={nodeType} createNode={() => {createInternalNode(nodeType as NodeTypes)}}>
                        <div>
                            {nodeType}
                        </div>
                    </NodeItem>
                ))
            }
        </div>
    </BaseLeftPopup>)
}

export default SelectNodePopUp;