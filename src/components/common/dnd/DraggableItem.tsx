'use client';

import { DraggableProvided } from '@hello-pangea/dnd';

interface Props {
  children: React.ReactNode;
  draggable?: DraggableProvided['draggableProps'];
  dragHandle?: DraggableProvided['dragHandleProps'];
  innerRef?: (element: HTMLElement | null) => void;
}

const DraggableItem = ({ children, draggable, innerRef }: Props) => {
  return (
    <div
      ref={innerRef}
      {...draggable}
    >
      {children}
    </div>
  );
};

export default DraggableItem;