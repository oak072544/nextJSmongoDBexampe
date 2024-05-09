"use client"
import React from 'react';
import { MeasuringStrategy } from '@dnd-kit/core';
import {
    arraySwap,
    AnimateLayoutChanges,
    defaultAnimateLayoutChanges,
    rectSortingStrategy,
    rectSwappingStrategy,
} from '@dnd-kit/sortable';

import { Sortable, Props as SortableProps } from './Sortable';
import { GridContainer } from '../../components';

const props: Partial<SortableProps> = {
    adjustScale: true,
    Container: (props: any) => <GridContainer {...props} columns={5} />,
    strategy: rectSortingStrategy,
    wrapperStyle: () => ({
        width: 140,
        height: 140,
    }),
};

export default function Grid() {
    return (

        <Sortable {...props} />

    )
}