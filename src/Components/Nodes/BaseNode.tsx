import React, {ReactNode, useMemo, useRef} from 'react';
import { Handle, Position } from '@xyflow/react';

interface BaseNodeProps  {
    children: ReactNode;
    customClass?: string;
}

const BaseNode: React.FC<BaseNodeProps> = ({ children, customClass = "" } : BaseNodeProps) => {
    const baseClassName = useRef("h-20 w-64 rounded border-slate-300 border-2 flex items-center justify-center");
    const customizeClassName = useMemo(() => {
        return `${baseClassName.current} ${customClass}`;
    }, [customClass]);

    return (
        <div>
            <div className={customizeClassName}>
                <Handle type="target" position={Position.Top} />
                {children}
                <Handle type="source" position={Position.Bottom} id="a" />
            </div>
        </div>
    );
};

export default BaseNode;
