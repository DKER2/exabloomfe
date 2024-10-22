import {useCallback, useEffect, useRef, useState} from 'react';
import {
    ReactFlow,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    BackgroundVariant, Node
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import AddEdge from "./components/edges/AddEdge.tsx";
import nodeTypes from "./consts/nodeTypes.ts";
import SelectNodePopUp from "./components/popUp/SelectNodePopUp.tsx";

const edgeTypes = { addEdge: AddEdge };
const initialNodes = [
    { id: '1', type: 'startNode', position: { x: 200, y: 100 }, data: { label: '1' } },
    { id: '2', type: 'endNode', position: { x: 200, y: 500 }, data: { label: '2' } },
];
const initialEdges = [{ id: 'e1-2', type: 'addEdge', source: '1', target: '2' }];

export default function App() {
    const [nodes, setNodes, onNodesChange] = useNodesState<Node>(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [isOpen, setIsOpen] = useState(false);

    const onConnect = useCallback(
        (params: any) => {
            params.type = 'addEdge'
            setEdges((eds) => addEdge(params, eds))
        },[setEdges]
    );

    const cursorPosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            cursorPosition.current = { x: event.clientX, y: event.clientY };
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const addNode = useCallback((type: string) => {
        const newNode : Node = {
            id: `${nodes.length + 1}`, // Unique ID for the new node
            type: `${type}`,
            position: cursorPosition.current, // Random position
            data: { label: `Node ${nodes.length + 1}` }, // Label for the node
        };
        setNodes((nds) => [...nds, newNode]); // Add the new node to the list
    }, [nodes, setNodes]);

    useEffect(() => {
        let shiftPressedCount = 0;
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Shift') {
                shiftPressedCount += 1;

                if (shiftPressedCount === 2) {
                    setIsOpen(true); // Add a new node on double Shift press
                    shiftPressedCount = 0; // Reset the counter
                }

                setTimeout(() => {
                    shiftPressedCount = 0; // Reset if the second press takes too long
                }, 300); // Time window to detect double press
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);


    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                onConnect={onConnect}
            >
                <SelectNodePopUp isOpen={isOpen} closePopUp={() => setIsOpen(false)} createNode={addNode}/>
                <Controls />
                <MiniMap />
                <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
            </ReactFlow>
        </div>
    );
}
