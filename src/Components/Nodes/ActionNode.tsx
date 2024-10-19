import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import BaseNode from "./BaseNode.tsx";
import BaseLeftPopUp from "../PopUp/BaseLeftPopUp.tsx";

const ActionNode : React.FC = () => {
    const [nodeName, setNodeName] = useState("Action");
    const [isPopUpOpen, setIsPopUpOpen] = useState(false);


    return (
        <BaseNode>
            <BaseLeftPopUp isOpen={isPopUpOpen} closePopup={() => {setIsPopUpOpen(false)}} onSubmit={() => {setNodeName("HEY")}}/>
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