"use client"
import React, { useEffect, useState } from 'react';
import { MeasuringStrategy, UniqueIdentifier } from '@dnd-kit/core';
import {
    arraySwap,
    AnimateLayoutChanges,
    defaultAnimateLayoutChanges,
    rectSortingStrategy,
    rectSwappingStrategy,
} from '@dnd-kit/sortable';

import { Sortable, Props as SortableProps, ServiceShortcut } from './Sortable';
import { GridContainer } from '../../components';
import { link } from 'fs';

/* const fetchData = async () => {
    let returnData: UniqueIdentifier[] = []
    try {
        let response = await fetch('api/dnd', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            const data = await response.json();
            let returnData: UniqueIdentifier[] = data.data;
            return returnData
        } else {
            console.error('Request failed with status:', response.status);
            return returnData
        }
    }
    catch (error) {
        console.error('Error fetching data:', error);
        return returnData
    }
} */

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

    /* let data: ServiceShortcut[] = [
        {
            id: 1,
            name: "Service 1",
            link: "https://www.google.com",
            picture: "/disabledByDefault.svg",
            type: "service",
        }
        ,
        {
            id: 2,
            name: "Service 2",
            link: "https://www.google.com",
            picture: "/recommendIcon.svg",
            type: "service",
        },
        {
            id: 3,
            name: "Folder",
            picture: "/folder.svg",
            type: "folder",
        }
    ] */

    const [data, setData] = useState<ServiceShortcut[]>([])
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/api/dnd')
            .then((res) => res.json())
            .then((data) => {
                setData(data.data)
                console.log(data.data)
                setLoading(false)
            })
    }, [])

    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>No profile data</p>

    return (
        <>
            <Sortable items={data}  {...props} />
        </>
    )
}