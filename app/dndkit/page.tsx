"use client"
import React, { useState } from 'react';
import Head from 'next/head';
import {
    closestCenter,
    closestCorners,
    rectIntersection,
    pointerWithin,
    DndContext,
    useDraggable,
    UniqueIdentifier,
    CollisionDetection as CollisionDetectionType,
    Modifiers,
} from '@dnd-kit/core';

import {
    Draggable,
    DraggableOverlay,
    Droppable,
    GridContainer,
    Wrapper,
} from '../../components';

interface Props {
    collisionDetection?: CollisionDetectionType;
    containers?: string[];
    modifiers?: Modifiers;
    value?: string;
}

function DroppableStory({
    containers = ['A'],
    collisionDetection,
    modifiers,
}: Props) {
    const [isDragging, setIsDragging] = useState(false);
    const [parent, setParent] = useState<UniqueIdentifier | null>(null);

    const item = <DraggableItem />;

    return (
        <>
            <Head>
                <title>Core/Droppable/useDroppable</title>
            </Head>
            <DndContext
                collisionDetection={collisionDetection}
                modifiers={parent === null ? undefined : modifiers}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={({ over }) => {
                    setParent(over ? over.id : null);
                    setIsDragging(false);
                }}
                onDragCancel={() => setIsDragging(false)}
            >
                <Wrapper>
                    <Wrapper style={{ width: 350, flexShrink: 0 }}>
                        {parent === null ? item : null}
                    </Wrapper>
                    <GridContainer columns={2}>
                        {containers.map((id) => (
                            <Droppable key={id} id={id} dragging={isDragging}>
                                {parent === id ? item : null}
                            </Droppable>
                        ))}
                    </GridContainer>
                </Wrapper>
                <DraggableOverlay />
            </DndContext>
        </>
    );
}

interface DraggableProps {
    handle?: boolean;
}

function DraggableItem({ handle }: DraggableProps) {
    const { isDragging, setNodeRef, listeners } = useDraggable({
        id: 'draggable-item',
    });

    return (
        <Draggable
            dragging={isDragging}
            ref={setNodeRef}
            handle={handle}
            listeners={listeners}
            style={{
                opacity: isDragging ? 0 : undefined,
            }}
        />
    );
}

function MultipleDroppables() {
    return (
        <DroppableStory containers={['A', 'B', 'C', 'E']} />
    )
};

export default MultipleDroppables;