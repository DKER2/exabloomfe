import React from "react";

interface NodeItemProps {
    children: React.ReactNode,
    createNode: () => void,
}
const NodeItem : React.FC<NodeItemProps> = ({children, createNode}) => {
    return(
        <div onClick={createNode}>
            { children }
        </div>
    )
}
export default NodeItem;