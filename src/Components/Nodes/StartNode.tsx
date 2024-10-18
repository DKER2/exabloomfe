import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-regular-svg-icons';
import BaseNode from "./BaseNode.tsx";

const StartNode : React.FC = () => {
    return (
        <BaseNode>
            <div className="w-full h-full flex items-center p-3">
                <FontAwesomeIcon icon={faMessage} className="text-green-500 bg-green-300 p-3 mr-2 rounded-md"/>
                <div>
                    <div className="text-green-500 font-bold">Start Node</div>
                    <div>Start</div>
                </div>
            </div>
        </BaseNode>
    );
}

export default StartNode;