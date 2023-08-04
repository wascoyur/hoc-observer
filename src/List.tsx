import React from "react";
import './list-style.scss'

export const Item = (props: { n: number }) => {
    console.log("render");

    return <div className="item">{props.n}</div>;
};

// список из 10 элементов
export const List = () => (
    <div className="list">
        {Array.from({ length: 10 }).map((_, i) => (
            <Item key={i} n={i + 1} />
        ))}
    </div>
)
