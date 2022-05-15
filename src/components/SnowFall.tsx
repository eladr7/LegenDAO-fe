import React from "react";

export default function SnowFall(): React.ReactElement {
    return (
        <div className="fixed top-0 left-0 w-full h-0 overflow-visible z-[200] flex justify-between">
            <div className="snow-group relative w-3 h-3 grow-0 shrink-0 overflow-visible">
                <div className="animate-snowfall-fast-l-r snow-flower -top-[10vh] odd:w-1/2 odd:h-1/2 even:w-2/3 even:h-2/3 bg-white rounded-full absolute"></div>
                <div className="animate-snowfall-slow-r-l snow-flower -top-[10vh] left-[10vw] odd:w-1/2 odd:h-1/2 even:w-2/3 even:h-2/3 bg-white rounded-full absolute"></div>
                <div className="animate-snowfall-normal-r-l -top-[10vh] odd:w-1/2 odd:h-1/2 even:w-2/3 even:h-2/3 bg-white rounded-full absolute"></div>
            </div>
            <div className="snow-group relative w-4 h-4 grow-0 shrink-0 overflow-visible">
                <div className="animate-snowfall-normal-l-r snow-flower -top-[10vh] odd:w-1/2 odd:h-1/2 even:w-2/3 even:h-2/3 bg-white rounded-full absolute"></div>
                <div className="animate-snowfall-normal-r-l snow-flower -top-[10vh] left-[10vw] odd:w-1/2 odd:h-1/2 even:w-2/3 even:h-2/3 bg-white rounded-full absolute"></div>
                <div className="animate-snowfall-slow-r-l -top-[10vh] odd:w-1/2 odd:h-1/2 even:w-2/3 even:h-2/3 bg-white rounded-full absolute"></div>
            </div>
            <div className="snow-group relative w-2 h-2 grow-0 shrink-0 overflow-visible">
                <div className="animate-snowfall-fast-l-r-lg snow-flower -top-[10vh] odd:w-1/2 odd:h-1/2 even:w-2/3 even:h-2/3 bg-white rounded-full absolute"></div>
                <div className="animate-snowfall-slow-r-l snow-flower -top-[10vh] left-[10vw] odd:w-1/2 odd:h-1/2 even:w-2/3 even:h-2/3 bg-white rounded-full absolute"></div>
                <div className="animate-snowfall-normal-r-l -top-[10vh] odd:w-1/2 odd:h-1/2 even:w-2/3 even:h-2/3 bg-white rounded-full absolute"></div>
            </div>
            <div className="snow-group relative w-2 h-2 grow-0 shrink-0 overflow-visible">
                <div className="animate-snowfall-slow-l-r snow-flower -top-[10vh] odd:w-1/2 odd:h-1/2 even:w-2/3 even:h-2/3 bg-white rounded-full absolute"></div>
                <div className="animate-snowfall-fast-r-l snow-flower -top-[10vh] left-[10vw] odd:w-1/2 odd:h-1/2 even:w-2/3 even:h-2/3 bg-white rounded-full absolute"></div>
                <div className="animate-snowfall-slow-r-l -top-[10vh] odd:w-1/2 odd:h-1/2 even:w-2/3 even:h-2/3 bg-white rounded-full absolute"></div>
            </div>
            <div className="snow-group relative w-4 h-4 grow-0 shrink-0 overflow-visible">
                <div className="animate-snowfall-fast-l-r snow-flower -top-[10vh] odd:w-1/2 odd:h-1/2 even:w-2/3 even:h-2/3 bg-white rounded-full absolute"></div>
                <div className="animate-snowfall-slow-r-l snow-flower -top-[10vh] left-[10vw] odd:w-1/2 odd:h-1/2 even:w-2/3 even:h-2/3 bg-white rounded-full absolute"></div>
                <div className="animate-snowfall-normal-r-l -top-[10vh] odd:w-1/2 odd:h-1/2 even:w-2/3 even:h-2/3 bg-white rounded-full absolute"></div>
            </div>
            <div className="snow-group relative w-4 h-4 grow-0 shrink-0 overflow-visible">
                <div className="animate-snowfall-normal-l-r snow-flower -top-[10vh] odd:w-1/2 odd:h-1/2 even:w-2/3 even:h-2/3 bg-white rounded-full absolute"></div>
                <div className="animate-snowfall-normal-r-l snow-flower -top-[10vh] left-[10vw] odd:w-1/2 odd:h-1/2 even:w-2/3 even:h-2/3 bg-white rounded-full absolute"></div>
                <div className="animate-snowfall-slow-r-l -top-[10vh] odd:w-1/2 odd:h-1/2 even:w-2/3 even:h-2/3 bg-white rounded-full absolute"></div>
            </div>
        </div>
    );
}
