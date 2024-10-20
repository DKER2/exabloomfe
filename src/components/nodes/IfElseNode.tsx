import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsSplitUpAndLeft  } from '@fortawesome/free-solid-svg-icons';
import BaseNode from "./BaseNode.tsx";
import useConditions from "../../hooks/useConditions.tsx";
import EditIfElseNodePopUp from "../popUp/EditIfElseNodePopUp.tsx";
import {useReactFlow} from "@xyflow/react";

interface BranchNodeProps {
    id: string
}

const IfElseNode : React.FC<BranchNodeProps> = ({id}) => {
    const [addContidions] = useConditions(["Branch #1", "Else"], id);
    const [nodeName, setNodeName] = useState("If/Else");
    const reactFlowInstance = useReactFlow();
    const [isPopUpOpen, setIsPopUpOpen] = useState(false);

    return (
        <div className="flex flex-col justify-center items-center">
            <EditIfElseNodePopUp id={id} onDelete={() => {reactFlowInstance.deleteElements({nodes: [{id}]})}} isOpen={isPopUpOpen} closePopUp={() => {setIsPopUpOpen(false)}} nodeName={nodeName} setNodeName={(name) => {setNodeName(name)}} addConditions={(newConditions: string[]) => {addContidions(newConditions)}}/>
            <BaseNode>
                <div className="w-full h-full flex items-center p-3 bg-white" onClick={() => {setIsPopUpOpen(true)}}>
                    <FontAwesomeIcon icon={faArrowsSplitUpAndLeft} className="text-amber-500 bg-amber-300 p-3 mr-2 rounded-md"/>
                    <div>
                        <div className="font-bold">{nodeName} Node</div>
                    </div>
                </div>
            </BaseNode>
        </div>
    );
}



export default IfElseNode;