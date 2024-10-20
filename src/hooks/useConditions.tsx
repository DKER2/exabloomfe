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

    const createConnectEdge = (target: string, source: string) => {
        const newEdge : Edge = { id: `e${source}-${target}`, source: `${source}`, target: `${target}` }
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

    const createConnectedChild = (condition : string, index: number) : [Node, Edge] => {
        const newNode = createNode(condition, index);
        const newEdge = createConnectEdge(newNode.id, id);
        return [newNode, newEdge];
    }

    const deleteConnectedChild = ([node, edge] : [Node, Edge]) : void => {
        reactFlowInstance.deleteElements(
            {
                edges: [edge],
                nodes: [node]
            }
        )
    }

    const realignItem = () => {
        const xOffSet = childElements.length * (-300);
        childElements.map(([childNode, ], index) => {
            reactFlowInstance.updateNode(childNode.id, {position: {x : node.position.x + xOffSet + index*300, y: childNode.position.y}});
        })
    }

    useEffect(() => {
        setChildElements(initialConditions.map(createConnectedChild));
        return () => {
            childElements.forEach(deleteConnectedChild)
        }
    }, []);

    const addConditions = useCallback((additionConditions: string[]) => {
        const newConnectedElements = additionConditions.map(createConnectedChild);
        realignItem()
        setChildElements([...childElements, ...newConnectedElements]);
    }, [])

    return [addConditions];
}