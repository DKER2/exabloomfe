// CustomEdge.tsx
import React from 'react';
import { EdgeProps, getBezierPath, useReactFlow } from '@xyflow/react';

const AddEdge: React.FC<EdgeProps> = ({
                                             id,
                                             sourceX,
                                             sourceY,
                                             targetX,
                                             targetY,
                                             source,
                                             target,
                                             style,
                                         }) => {
    // Generate the Bezier path for the edge
    const [edgePath, labelX, labelY] = getBezierPath({
        sourceX,
        sourceY,
        targetX,
        targetY
    });
    const reactFlowInstance = useReactFlow();

    const handleAdd = () => {
        const newId = new Date().toISOString()
        const newNode = {
            id: newId, // or another method to generate a unique ID
            type: 'actionNode', // specify the type if needed
            position: { x: labelX-128, y: labelY-40}, //offset for width and height for baseNode
            data: { label: `${new Date().getTime()}` },
        };
        const newEdges = [
            { id: `e${source}-${newId}`, type: 'addEdge', source: `${source}`, target: `${newId}` },
            { id: `e${newId}-${target}`, type: 'addEdge', source: `${newId}`, target: `${target}` },
        ]
        reactFlowInstance.addNodes(newNode);
        reactFlowInstance.addEdges(newEdges);
        reactFlowInstance.deleteElements({ edges: [{ id }] })
    };

    return (
        <>
            {/* Render the edge path */}
            <path id={id} style={style} className="react-flow__edge-path" d={edgePath} />

            {/* Render the delete button at the center of the edge */}
            <foreignObject
                x={labelX-10}
                y={labelY-10}
                width={20}
                height={20}
                style={{ overflow: 'hidden' }}
            >
                <button
                    className="text-black text-sm p-1 rounded flex items-center justify-center bg-white"
                    onClick={handleAdd}
                    style={{ width: '100%', height: '100%'}}
                >
                    +
                </button>
            </foreignObject>
        </>
    );
};

export default AddEdge;