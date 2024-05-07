"use client"
import GridLayout from 'react-grid-layout'
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
export default function Home() {
    const layout = [
        { i: "a", x: 0, y: 0, w: 1, h: 2, },
        { i: "b", x: 1, y: 0, w: 1, h: 2, },
        { i: "c", x: 2, y: 0, w: 1, h: 2 }
    ];
    return (
        <>
            <GridLayout
                className="layout"
                layout={layout}
                cols={12}
                rowHeight={30}
                width={1200}
            >
                <div key="a" className="">a1</div>
                <div key="b" className="">b2</div>
                <div key="c" className="">c</div>
            </GridLayout>
        </>
    );
}
