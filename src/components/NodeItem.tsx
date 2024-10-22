import React from "react";

interface NodeItemProps {
    children: React.ReactNode,
    createNode: () => void,
}
const NodeItem : React.FC<NodeItemProps> = ({children, createNode}) => {
    return(
        <div onClick={createNode} className="m-6 p-2 border-solid border-2">
            { children }
        </div>
    )
}
export default NodeItem;