import StartNode from "../components/nodes/StartNode.tsx";
import EndNode from "../components/nodes/EndNode.tsx";
import ActionNode from "../components/nodes/ActionNode.tsx";
import IfElseNode from "../components/nodes/IfElseNode.tsx";
import BranchNode from "../components/nodes/BranchNode.tsx";

export type NodeTypes = 'startNode' | 'endNode' | 'actionNode' | 'ifElseNode' | 'branchNode';
export type CreatableNodeTypes = 'endNode' | 'actionNode' | 'ifElseNode';

const nodeTypes: Record<NodeTypes, React.FC<any>> = {
    startNode: StartNode,
    endNode: EndNode,
    actionNode: ActionNode,
    ifElseNode: IfElseNode,
    branchNode: BranchNode,
};

export default  nodeTypes