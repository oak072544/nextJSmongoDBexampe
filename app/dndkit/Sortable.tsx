import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import {
  Active,
  Announcements,
  closestCenter,
  CollisionDetection,
  DragOverlay,
  DndContext,
  DropAnimation,
  KeyboardSensor,
  KeyboardCoordinateGetter,
  Modifiers,
  MouseSensor,
  MeasuringConfiguration,
  PointerActivationConstraint,
  ScreenReaderInstructions,
  TouchSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
  defaultDropAnimationSideEffects,
} from '@dnd-kit/core';
import {
  arrayMove,
  useSortable,
  SortableContext,
  sortableKeyboardCoordinates,
  SortingStrategy,
  rectSortingStrategy,
  AnimateLayoutChanges,
  NewIndexGetter,
} from '@dnd-kit/sortable';

import { createRange } from '../../utilities';
import { Item, List, Wrapper } from '../../components';

export interface ServiceShortcut {
  id: UniqueIdentifier;
  name: string;
  link?: string;
  picture?: string;
  type: string;
}

export interface Props {
  activationConstraint?: PointerActivationConstraint;
  animateLayoutChanges?: AnimateLayoutChanges;
  adjustScale?: boolean;
  collisionDetection?: CollisionDetection;
  coordinateGetter?: KeyboardCoordinateGetter;
  Container?: any; // To-do: Fix me
  dropAnimation?: DropAnimation | null;
  getNewIndex?: NewIndexGetter;
  handle?: boolean;
  itemCount?: number;
  /* items?: UniqueIdentifier[]; */
  items?: ServiceShortcut[];
  measuring?: MeasuringConfiguration;
  modifiers?: Modifiers;
  renderItem?: any;
  removable?: boolean;
  reorderItems?: typeof arrayMove;
  strategy?: SortingStrategy;
  style?: React.CSSProperties;
  useDragOverlay?: boolean;
  getItemStyles?(args: {
    id: UniqueIdentifier;
    index: number;
    isSorting: boolean;
    isDragOverlay: boolean;
    overIndex: number;
    isDragging: boolean;
  }): React.CSSProperties;
  wrapperStyle?(args: {
    active: Pick<Active, 'id'> | null;
    index: number;
    isDragging: boolean;
    id: UniqueIdentifier;
  }): React.CSSProperties;
  isDisabled?(id: UniqueIdentifier): boolean;
}

const dropAnimationConfig: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0.5',
      },
    },
  }),
};

const screenReaderInstructions: ScreenReaderInstructions = {
  draggable: `
    To pick up a sortable item, press the space bar.
    While sorting, use the arrow keys to move the item.
    Press space again to drop the item in its new position, or press escape to cancel.
  `,
};

/**
 * Renders a sortable list of items using the DndContext.
 *
 * @param activationConstraint - The activation constraint for the sensors.
 * @param animateLayoutChanges - Determines whether layout changes should be animated.
 * @param adjustScale - Determines whether to adjust the scale of the sortable items.
 * @param Container - The container component to render the sortable items.
 * @param collisionDetection - The collision detection strategy to use.
 * @param coordinateGetter - The function to get the coordinates for keyboard sorting.
 * @param dropAnimation - The configuration for the drop animation.
 * @param getItemStyles - The function to get the styles for each sortable item.
 * @param getNewIndex - The function to get the new index for a sortable item.
 * @param handle - Determines whether to show a handle for dragging.
 * @param itemCount - The number of items in the sortable list.
 * @param initialItems - The initial items in the sortable list.
 * @param isDisabled - The function to determine if a sortable item is disabled.
 * @param measuring - Determines whether to enable measuring for the sortable items.
 * @param modifiers - The modifiers to apply to the sortable items.
 * @param removable - Determines whether sortable items can be removed.
 * @param renderItem - The function to render each sortable item.
 * @param reorderItems - The function to reorder the items in the sortable list.
 * @param strategy - The sorting strategy to use.
 * @param style - The style to apply to the sortable component.
 * @param useDragOverlay - Determines whether to use a drag overlay for dragging.
 * @param wrapperStyle - The function to get the styles for the sortable item wrapper.
 */

export function Sortable({
  activationConstraint,
  animateLayoutChanges,
  adjustScale = false,
  Container = List,
  collisionDetection = closestCenter,
  coordinateGetter = sortableKeyboardCoordinates,
  dropAnimation = dropAnimationConfig,
  getItemStyles = () => ({}),
  getNewIndex,
  handle = false,
  itemCount = 16,
  items: initialItems,
  isDisabled = () => false,
  measuring,
  modifiers,
  removable,
  renderItem,
  reorderItems = arrayMove,
  strategy = rectSortingStrategy,
  style,
  useDragOverlay = true,
  wrapperStyle = () => ({}),
}: Props) {


  const [items, setItems] = useState<ServiceShortcut[]>(
    () =>
      initialItems ??
      /* createRange<UniqueIdentifier>(itemCount, (index) => index + 1) */
      []
  );
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint,
    }),
    useSensor(TouchSensor, {
      activationConstraint,
    }),
    useSensor(KeyboardSensor, {
      // Disable smooth scrolling in Cypress automated tests
      scrollBehavior: typeof window !== 'undefined' && 'Cypress' in window ? 'auto' : undefined,
      coordinateGetter,
    })
  );
  const isFirstAnnouncement = useRef(true);
  /* const getIndex = (id: UniqueIdentifier) => items.indexOf(id); */
  const getIndex = (id: UniqueIdentifier) => items.findIndex((item) => item.id === id);
  const getPosition = (id: UniqueIdentifier) => getIndex(id) + 1;
  const activeIndex = activeId ? getIndex(activeId) : -1;
  const handleRemove = removable
    ? (id: UniqueIdentifier) =>
      /*       setItems((items) => items.filter((item) => item !== id)) */
      setItems((items) => items.filter((item) => item.id !== id))
    : undefined;
  const announcements: Announcements = {
    onDragStart({ active: { id } }) {
      return `Picked up sortable item ${String(
        id
      )}. Sortable item ${id} is in position ${getPosition(id)} of ${items.length
        }`;
    },
    onDragOver({ active, over }) {
      // In this specific use-case, the picked up item's `id` is always the same as the first `over` id.
      // The first `onDragOver` event therefore doesn't need to be announced, because it is called
      // immediately after the `onDragStart` announcement and is redundant.
      if (isFirstAnnouncement.current === true) {
        isFirstAnnouncement.current = false;
        return;
      }

      if (over) {
        return `Sortable item ${active.id
          } was moved into position ${getPosition(over.id)} of ${items.length}`;
      }

      return;
    },
    onDragEnd({ active, over }) {
      if (over) {
        return `Sortable item ${active.id
          } was dropped at position ${getPosition(over.id)} of ${items.length}`;
      }

      return;
    },
    onDragCancel({ active: { id } }) {
      return `Sorting was cancelled. Sortable item ${id} was dropped and returned to position ${getPosition(
        id
      )} of ${items.length}.`;
    },
  };

  const saveData = async () => {
    try {
      // Call your save API here
      // Example:
      const response = await fetch('/api/dnd', {
        method: 'POST',
        body: JSON.stringify(items), // Convert items array to JSON string
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        console.log('Data saved successfully');
      } else {
        console.error('Failed to save data');
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  useEffect(() => {
    if (!activeId) {
      isFirstAnnouncement.current = true;
    }
  }, [activeId]);

  typeof document !== 'undefined' ? document.body : null
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient ? (
    <>
      <DndContext
        accessibility={{
          announcements,
          screenReaderInstructions,
        }}
        sensors={sensors}
        collisionDetection={collisionDetection}
        onDragStart={({ active }) => {
          if (!active) {
            return;
          }

          setActiveId(active.id);
        }}
        onDragEnd={({ over }) => {
          setActiveId(null);

          if (over) {
            debugger
            const overIndex = getIndex(over.id);
            if (activeIndex !== overIndex) {
              setItems((items) => reorderItems(items, activeIndex, overIndex));
            }
          }
        }}
        onDragCancel={() => setActiveId(null)}
        measuring={measuring}
        modifiers={modifiers}
      >
        <Wrapper style={style} center>
          <SortableContext items={items} strategy={strategy}>
            <Container>
              {items.map((value, index) => (
                <SortableItem
                  key={value.id}
                  id={value.id}
                  value={value.name}
                  picture={value.picture}
                  handle={handle}
                  index={index}
                  style={getItemStyles}
                  wrapperStyle={wrapperStyle}
                  disabled={isDisabled(value.id)}
                  renderItem={renderItem}
                  onRemove={handleRemove}
                  animateLayoutChanges={animateLayoutChanges}
                  useDragOverlay={useDragOverlay}
                  getNewIndex={getNewIndex}
                />
              ))}
            </Container>
          </SortableContext>
        </Wrapper>
        {useDragOverlay
          ? createPortal(
            <DragOverlay
              adjustScale={adjustScale}
              dropAnimation={dropAnimation}
            >
              {activeId ? (
                <Item
                  value={items[activeIndex].name}
                  picture={items[activeIndex].picture}
                  handle={handle}
                  renderItem={renderItem}
                  wrapperStyle={wrapperStyle({
                    active: { id: activeId },
                    index: activeIndex,
                    isDragging: true,
                    id: items[activeIndex].id,
                  })}
                  style={getItemStyles({
                    id: items[activeIndex].id,
                    index: activeIndex,
                    isSorting: activeId !== null,
                    isDragging: true,
                    overIndex: -1,
                    isDragOverlay: true,
                  })}
                  dragOverlay
                />
              ) : null}
            </DragOverlay>,
            document.body
          )
          : null}
      </DndContext>
      <button onClick={saveData}>save</button>
    </>
  ) : null;
}

interface SortableItemProps {
  animateLayoutChanges?: AnimateLayoutChanges;
  disabled?: boolean;
  getNewIndex?: NewIndexGetter;
  id: UniqueIdentifier;
  value?: any;
  picture?: string;
  index: number;
  handle: boolean;
  useDragOverlay?: boolean;
  onRemove?(id: UniqueIdentifier): void;
  style(values: any): React.CSSProperties;
  renderItem?(args: any): React.ReactElement;
  wrapperStyle: Props['wrapperStyle'];
}

export function SortableItem({
  disabled,
  animateLayoutChanges,
  getNewIndex,
  handle,
  id,
  value,
  picture,
  index,
  onRemove,
  style,
  renderItem,
  useDragOverlay,
  wrapperStyle,
}: SortableItemProps) {
  const {
    active,
    attributes,
    isDragging,
    isSorting,
    listeners,
    overIndex,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({
    id,
    animateLayoutChanges,
    disabled,
    getNewIndex,
  });

  return (
    <>
      <Item
        ref={setNodeRef}
        value={value}
        picture={picture}
        disabled={disabled}
        dragging={isDragging}
        sorting={isSorting}
        handle={handle}
        handleProps={
          handle
            ? {
              ref: setActivatorNodeRef,
            }
            : undefined
        }
        renderItem={renderItem}
        index={index}
        style={style({
          index,
          id,
          isDragging,
          isSorting,
          overIndex,
        })}
        onRemove={onRemove ? () => onRemove(id) : undefined}
        transform={transform}
        transition={transition}
        wrapperStyle={wrapperStyle?.({ index, isDragging, active, id })}
        listeners={listeners}
        data-index={index}
        data-id={id}
        dragOverlay={!useDragOverlay && isDragging}
        {...attributes}
      />

    </>
  );
}
