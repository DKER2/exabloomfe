import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsSplitUpAndLeft  } from '@fortawesome/free-solid-svg-icons';
import BaseNode from "./BaseNode.tsx";
import useConditions from "../../hooks/useConditions.tsx";

interface BranchNodeProps {
    id: string
}

const IfElseNode : React.FC<BranchNodeProps> = ({id}) => {
    const [addConditions] = useConditions(["Branch #1", "Else"], id);
    const [isPopUpOpen, setIsPopUpOpen] = useState(false);

    return (
        <div className="flex flex-col justify-center items-center">
            <BaseNode>
                <div className="w-full h-full flex items-center p-3 bg-white" onClick={() => {setIsPopUpOpen(true)}}>
                    <FontAwesomeIcon icon={faArrowsSplitUpAndLeft} className="text-amber-500 bg-amber-300 p-3 mr-2 rounded-md"/>
                    <div>
                        <div className="font-bold">If/Else Node</div>
                    </div>
                </div>
            </BaseNode>
        </div>
    );
}



export default IfElseNode;