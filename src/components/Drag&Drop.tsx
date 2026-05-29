import { ReactNode } from 'react';
import { DragDropProvider, useDraggable, useDroppable } from '@dnd-kit/react';

interface DraggableProps {
    id: string;
    children: ReactNode;
}

interface DroppableProps {
    id: string;
    children: ReactNode;
}

export function Draggable({ id, children }: DraggableProps) {
    const { ref } = useDraggable({ id });
    return <div ref={ref}>{children}</div>;
}

export function Droppable({ id, children }: DroppableProps) {
    const { ref } = useDroppable({ id });
    return <div ref={ref} className="min-h-full">{children}</div>;
}

export { DragDropProvider };
