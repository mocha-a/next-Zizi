'use client';

import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult, DraggableProvided } from '@hello-pangea/dnd';

interface Props<T> {
  items: T[];
  droppableId: string;
  onDragEnd: (result: DropResult) => void;
  getId: (item: T) => string;

  className?: string;

  renderItem: (
    item: T,
    provided: DraggableProvided,
    index: number
  ) => React.ReactNode;
}

const DndList = <T,>({ items, droppableId, onDragEnd, getId, className, renderItem }: Props<T>) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={droppableId}>
        {(dropProvided) => (
          <div
            ref={dropProvided.innerRef}
            {...dropProvided.droppableProps}
            className={className}
          >
            {items.map((item, index) => (
              <Draggable
                key={getId(item)}
                draggableId={getId(item)}
                index={index}
              >
                {(dragProvided) =>
                  renderItem(item, dragProvided, index)
                }
              </Draggable>
            ))}

            {dropProvided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DndList;