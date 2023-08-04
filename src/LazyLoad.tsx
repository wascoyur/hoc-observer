import React, {ReactNode, useEffect} from "react";

export const Placeholder=(props:{width?:number|string, height?:number|string})=>{
    const width =
        props.width && typeof props.width === "string"
            ? props.width
            : props.width + "px";
    const height =
        props.height && typeof props.height === "string"
            ? props.height
            : props.height + "px";

    return<div className="child-placeholder" style={{width,height}}></div>
}

type LazyLoadProps = {
    children: React.JSX.Element;
    width?: number | string;
    height?: number | string;
    once?: boolean;
    observerOptions?: IntersectionObserverInit;
};
export const LazyLoad = (props: LazyLoadProps) => {
    const childRef = React.useRef<HTMLDivElement>(null);
    const [isIntersecting, setIntersecting] = React.useState(false);

useEffect(() => {
        // потомок
        const child = childRef.current as HTMLDivElement;

        // наблюдатель
        const observer = new IntersectionObserver(([entry]) => {
            // обновляем состояние индикатора
            setIntersecting(entry.isIntersecting);

            // если элемент находится в области просмотра и
            // индикатор однократности имеет значение `true`
            if (props.once && entry.isIntersecting) {
                // прекращаем наблюдение
                observer.unobserve(child);
            }
        }, props.observerOptions);

        // начинаем наблюдение
        observer.observe(child);

        // прекращаем наблюдение при размонтировании компонента
        return () => observer.unobserve(child);
    }, []);

    if (props.once && isIntersecting) return props.children;


    return <div ref={childRef} className="lazy-load-box">
        {isIntersecting ? (
            props.children
        ) : (
            <Placeholder width={props.width} height={props.height} />
        )}
    </div>
};
