import React, {useState} from 'react';
import { EdgeProps, getBezierPath, useReactFlow, Node } from '@xyflow/react';
import SelectNodePopUp from "../popUp/SelectNodePopUp.tsx";
import {NodeTypes} from "../../consts/nodeTypes.ts";

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
    const reactFlowInstance = useReactFlow();
    const [edgePath, labelX, labelY] = getBezierPath({
        sourceX,
        sourceY,
        targetX,
        targetY
    });
    const [isOpen, setIsOpen] = useState(false);

    const createNode = (type: NodeTypes) : string => {
        const newId = new Date().toISOString()
        const newNode : Node = {
            id: newId, // or another method to generate a unique ID
            type: type, // specify the type if needed
            position: { x: labelX-128, y: labelY-40}, //offset for width and height for baseNode
            data: {},
        };
        reactFlowInstance.addNodes(newNode);
        return newId
    }

    const addInternalEdges = (type: NodeTypes, id: string) : void => {
        const newEdges = [
            { id: `e${source}-${id}`, type: 'addEdge', source: `${source}`, target: `${id}` },
        ]
        if(type != "ifElseNode") {
            newEdges.push({ id: `e${id}-${target}`, type: 'addEdge', source: `${id}`, target: `${target}` })
        }
        reactFlowInstance.addEdges(newEdges);
    }

    const deleteEdges = (id: string) : void => {
        reactFlowInstance.deleteElements({ edges: [{ id }] }).then()
    }

    const deleteNode = (id: string) : void => {
        reactFlowInstance.deleteElements({ nodes: [{ id }] })
    }

    const createInternalNode = (type: NodeTypes) => {
        const newId = createNode(type)
        addInternalEdges(type, newId)
        if(type == "ifElseNode") {
            deleteNode(target)
        }
        deleteEdges(id)
    }

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
                    onClick={() => {
                        setIsOpen(true)
                    }}
                    style={{ width: '100%', height: '100%'}}
                >
                    +
                </button>

            </foreignObject>
            <SelectNodePopUp isOpen={isOpen} closePopUp={() => setIsOpen(false)} createInternalNode={createInternalNode}/>
        </>
    );
};

export default AddEdge;
