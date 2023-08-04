import React from "react";
import './list-style.scss'
import {LazyLoad} from "./LazyLoad";

export const Item = (props: { n: number }) => {

    console.log(`render ${props.n}`);

    return <div className="item">{props.n}</div>;
};

// список из 10 элементов
export const List = () => (
    <div className="list">
        {Array.from({ length: 10 }).map((_, i) => (
            <LazyLoad key={i}>
                <Item key={i} n={i + 1} />
            </LazyLoad>
        ))}
    </div>
)
