// CustomEdge.tsx
import React from 'react';
import { EdgeProps, getBezierPath, useReactFlow } from '@xyflow/react';

const CustomEdge: React.FC<EdgeProps> = ({
                                             id,
                                             sourceX,
                                             sourceY,
                                             targetX,
                                             targetY,
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

    const handleDelete = () => {
        reactFlowInstance.deleteElements({ edges: [{ id }] });
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
                    onClick={handleDelete}
                    style={{ width: '100%', height: '100%'}}
                >
                    +
                </button>
            </foreignObject>
        </>
    );
};

export default CustomEdge;
