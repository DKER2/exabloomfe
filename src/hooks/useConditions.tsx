import {useCallback, useEffect, useState, useMemo} from 'react';
import {useReactFlow, Node, Edge} from "@xyflow/react";

export default function useConditions(initialConditions: string[], id: string): [(additionConditions: string[]) => void] {
    const [childElements, setChildElements] = useState<[Node, Edge][]>([]);
    const reactFlowInstance = useReactFlow();

    const node = useMemo(() => {
        const foundNode = reactFlowInstance.getNode(id);
        if (!foundNode) {
            throw new Error(`Node with ID ${id} not found.`);
        }
        return foundNode;}, [id])

    const createConnectEdge = (target: string, source: string, type ="") => {
        const newEdge : Edge = { id: `e${source}-${target}`, type: `${type}`, source: `${source}`, target: `${target}` }
        reactFlowInstance.addEdges(newEdge);
        return newEdge;
    }

    const createNode = (condition: string, index: number) => {
        const newId = `${condition}-${new Date().toISOString()}`; // Create unique ID
        const newNode : Node = {
            id: newId,
            type: 'branchNode', // Set desired node type
            position: { x: node.position.x - 300 + index*600, y: node.position.y + 100 },
            data: { name: `${condition}` },
        };
        reactFlowInstance.addNodes(newNode); // Add the new node
        return newNode;
    };

    const createConnectedEndNode = (node: Node) => {
        const newId = `${node.id}-${new Date().toISOString()}`; // Create unique ID
        const newNode : Node = {
            id: newId,
            type: 'endNode', // Set desired node type
            position: { x: node.position.x, y: node.position.y + 100 },
            data: {},
        };
        createConnectEdge(newNode.id, node.id, "addEdge")
        reactFlowInstance.addNodes(newNode);
    }

    const createConnectedChild = (condition : string, index: number) : [Node, Edge] => {
        const newNode = createNode(condition, index);
        const newEdge = createConnectEdge(newNode.id, id);
        createConnectedEndNode(newNode)
        return [newNode, newEdge];
    }

    // const deleteConnectedChild = ([node, edge] : [Node, Edge]) : void => {
    //     reactFlowInstance.deleteElements(
    //         {
    //             edges: [edge],
    //             nodes: [node]
    //         }
    //     )
    // }

    const realignItem = () => {
        const xOffSet = childElements.length * (-300);
        childElements.map(([childNode, ], index) => {
            reactFlowInstance.updateNode(childNode.id, {position: {x : node.position.x + xOffSet + index*300, y: childNode.position.y}});
        })
    }

    const collectConnectedElements = (
        nodeId: string,
        nodesToDelete: Set<string> = new Set(),
        edgesToDelete: Set<string> = new Set()
    ) => {
        const allEdges = reactFlowInstance.getEdges();
        const connectedEdges = allEdges.filter((edge) => edge.source === nodeId);

        nodesToDelete.add(nodeId);
        connectedEdges.forEach((edge) => {
            edgesToDelete.add(edge.id);
            if (!nodesToDelete.has(edge.target)) {
                collectConnectedElements(edge.target, nodesToDelete, edgesToDelete);
            }
        });
    };

    const deleteFlowFromNode = (nodeId: string) => {
        const nodesToDelete = new Set<string>();
        const edgesToDelete = new Set<string>();

        collectConnectedElements(nodeId, nodesToDelete, edgesToDelete);

        const nodes = Array.from(nodesToDelete).map((id) => ({ id }));
        const edges = Array.from(edgesToDelete).map((id) => ({ id }));

        reactFlowInstance.deleteElements({ nodes, edges });
    };

    useEffect(() => {
        setChildElements(initialConditions.map(createConnectedChild));
        return () => {
            childElements.forEach(([node]) => {
                deleteFlowFromNode(node.id)
            })
        }
    }, []);

    const addConditions = useCallback((additionConditions: string[]) => {
        const newConnectedElements = additionConditions.map(createConnectedChild);
        realignItem()
        setChildElements([...childElements, ...newConnectedElements]);
    }, [])

    return [addConditions];
}