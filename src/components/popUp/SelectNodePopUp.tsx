import React from "react";
import BaseLeftPopup from "./BaseLeftPopUp.tsx";
import NodeItem from "../NodeItem.tsx";
import nodeTypes, {NodeTypes} from "../../consts/nodeTypes.ts";

interface SelectNodePopUpProps {
    isOpen: boolean;
    closePopUp: () => void;
    createNode: (type : NodeTypes) => void;
}

const SelectNodePopUp: React.FC<SelectNodePopUpProps> = ({isOpen , closePopUp, createNode}) => {
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
            <div className="flex flex-col justify-center items-center">
                {
                    Object.entries(nodeTypes).map(([nodeType, CustomNode]) => {
                        if (['endNode', 'actionNode', 'ifElseNode'].includes(nodeType)) {
                            return (<NodeItem key={nodeType} createNode={() => {
                                createNode(nodeType as NodeTypes);
                                closePopUp()
                            }}>
                                <div className="font-bold">
                                    {nodeType}
                                </div>
                                <div>
                                    <CustomNode id="random" data={"Branch"}/>
                                </div>
                            </NodeItem>)
                        }
                    })
                }
            </div>
        </div>
    </BaseLeftPopup>)
}

export default SelectNodePopUp;