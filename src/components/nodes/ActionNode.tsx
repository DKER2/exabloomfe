import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import BaseNode from "./BaseNode.tsx";
import EditActionNodePopUp from "../popUp/EditActionNodePopUp.tsx";
import {useReactFlow} from "@xyflow/react";

interface ActionNodeProps {
    id: string
}

const ActionNode : React.FC<ActionNodeProps> = ({id}) => {
    const [nodeName, setNodeName] = useState("Action");
    const [isPopUpOpen, setIsPopUpOpen] = useState(false);
    const reactFlowInstance = useReactFlow();

    return (
        <BaseNode>
            <EditActionNodePopUp id={id} isOpen={isPopUpOpen} onDelete={() => {reactFlowInstance.deleteElements({nodes: [{id}]})}} nodeName={nodeName} closePopUp={() => {setIsPopUpOpen(false)}} setNodeName={(name) => {setNodeName(name)}}/>
            <div className="w-full h-full flex items-center p-3 bg-white" onClick={() => {setIsPopUpOpen(true)}}>
                <FontAwesomeIcon icon={faUserCircle} className="text-blue-500 bg-blue-300 p-3 mr-2 rounded-md"/>
                <div>
                    <div className="font-bold">{nodeName} Node</div>
                </div>
            </div>
        </BaseNode>
    );
}

export default ActionNode;