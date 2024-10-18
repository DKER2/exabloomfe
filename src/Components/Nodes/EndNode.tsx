import React from 'react';
import BaseNode from "./BaseNode.tsx";

const EndNode : React.FC = () => {
    return (
        <BaseNode customClass="rounded-full bg-slate-200">
            <div className="w-full h-full flex items-center justify-center p-3">
                End
            </div>
        </BaseNode>
    );
}

export default EndNode;