import React from 'react';
import BaseNode from "./BaseNode.tsx";

interface BranchNodeProps {
    data: {
        name: string;
    };
}
const BranchNode : React.FC<BranchNodeProps> = ({data}) => {;
    return (
        <BaseNode disableDefaultHandle={true} customClass="rounded-full bg-slate-400">
            <div className="w-full h-full flex items-center justify-center p-3">
                {data.name}
            </div>
        </BaseNode>
    );
}

export default BranchNode;