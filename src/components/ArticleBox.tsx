import cn from "classnames";
import React, { useEffect, useRef } from "react";

type Props = React.BaseHTMLAttributes<HTMLDivElement> & {
    position?: "right" | "left";
    childElement: Array<React.ReactNode>;
    className?: string;
    callbackFunction?: (params?: IntersectionObserverEntry) => void;
};

export function ArticleBox({
    position = "left",
    childElement,
    className,
    callbackFunction,
    ...props
}: Props): React.ReactElement {
    const ref = useRef(null);
    const isInViewPort = (element: IntersectionObserverEntry) => {
        // Get the bounding client rectangle position in the viewport
        const bounding = element.boundingClientRect;

        if (
            bounding.bottom >= 0 &&
            bounding.left >= 0 &&
            bounding.right <= (window.innerWidth || document.documentElement.clientWidth) &&
            bounding.top <= (window.innerHeight || document.documentElement.clientHeight)
        ) {
            // console.log("In the viewport! :)");
            return true;
        } else {
            // console.log("Not in the viewport. :(");
            return false;
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            // Update our state when observer callback fires
            if (isInViewPort(entry)) {
                callbackFunction && callbackFunction(entry);
            }
        });

        const current = ref.current;

        if (current) {
            observer.observe(current);
        }
        return () => {
            if (current) {
                observer.unobserve(current);
            }
        };
    }, [callbackFunction, ref]);

    return (
        <div
            className={cn("flex", position === "left" ? "flex-row" : "flex-row-reverse", className)}
            ref={ref}
            {...props}
        >
            {childElement.map((colume, index) => {
                return (
                    <div key={index} className="w-[35%]">
                        {colume}
                    </div>
                );
            })}
        </div>
    );
}
