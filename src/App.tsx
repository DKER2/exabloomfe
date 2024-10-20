import {useCallback} from 'react';
import {
    ReactFlow,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    BackgroundVariant
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import AddEdge from "./components/edges/AddEdge.tsx";
import nodeTypes from "./consts/nodeTypes.ts";

const edgeTypes = { addEdge: AddEdge };
const initialNodes = [
    { id: '1', type: 'startNode', position: { x: 200, y: 100 }, data: { label: '1' } },
    { id: '2', type: 'endNode', position: { x: 200, y: 500 }, data: { label: '2' } },
];
const initialEdges = [{ id: 'e1-2', type: 'addEdge', source: '1', target: '2' }];

export default function App() {
    const [nodes, , onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback(
        (params: any) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

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
                <Controls />
                <MiniMap />
                <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
            </ReactFlow>
        </div>
    );
}
