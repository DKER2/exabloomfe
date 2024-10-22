import React from 'react';
import BaseNode from "./BaseNode.tsx";

interface BranchNodeProps {
    data: {
        name: string;
    };
    disableDefaultHandle: boolean
}
const BranchNode : React.FC<BranchNodeProps> = ({data, disableDefaultHandle = false}) => {;
    return (
        <BaseNode disableDefaultHandle={disableDefaultHandle} customClass="rounded-full bg-slate-400">
            <div className="w-full h-full flex items-center justify-center p-3">
                {data.name}
            </div>
        </BaseNode>
    );
}

export default BranchNode;