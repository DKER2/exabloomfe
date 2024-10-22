import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsSplitUpAndLeft  } from '@fortawesome/free-solid-svg-icons';
import BaseNode from "./BaseNode.tsx";
import EditIfElseNodePopUp from "../popUp/EditIfElseNodePopUp.tsx";
import {Handle, Position, useReactFlow} from "@xyflow/react";
import BranchNode from "./BranchNode.tsx";

interface BranchNodeProps {
    id: string
}

const IfElseNode : React.FC<BranchNodeProps> = ({id}) => {
    // const [addConditions] = useConditions(useRef(["Branch #1", "Else"]).current, id);
    const [conditions, setConditions, ] = useState(["Branch #1", "Else"])
    const [nodeName, setNodeName] = useState("If/Else");
    const reactFlowInstance = useReactFlow();
    const [isPopUpOpen, setIsPopUpOpen] = useState(false);

    return (
        <div className="flex flex-col justify-center items-center">
            <EditIfElseNodePopUp id={id} onDelete={() => {reactFlowInstance.deleteElements({nodes: [{id}]})}} isOpen={isPopUpOpen} closePopUp={() => {setIsPopUpOpen(false)}} nodeName={nodeName} setNodeName={(name) => {setNodeName(name)}} setConditions={setConditions} conditions={conditions}/>
            <Handle type="target" position={Position.Top} />
            <BaseNode disableDefaultHandle={true}>
                <div className="w-full h-full flex items-center p-3 bg-white" onClick={() => {setIsPopUpOpen(true)}}>
                    <FontAwesomeIcon icon={faArrowsSplitUpAndLeft} className="text-amber-500 bg-amber-300 p-3 mr-2 rounded-md"/>
                    <div>
                        <div className="font-bold">{nodeName} Node</div>
                    </div>
                </div>
            </BaseNode>
            <div className="flex">
                {conditions.map((condition, index) => {
                    return (
                        <div key={condition}>
                            <BranchNode disableDefaultHandle={true} data={{name: condition}} />
                            <Handle style={{left: 128 + index*256}} id={condition} type="source" position={Position.Bottom} />
                        </div>)
                })}
            </div>
        </div>
    );
}



export default IfElseNode;