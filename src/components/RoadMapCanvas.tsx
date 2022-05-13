import { useCallback, useEffect, useRef } from "react";

interface TPosition {
    x: number;
    y: number;
    type: "right" | "left";
}

function RoadMapCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const allParagraph = document.querySelectorAll(".canvas-paragraph") || undefined;
    const canvasContainer = document.querySelector(".canvas-container") || undefined;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    const getPosition = useCallback(
        (element: Element, type: "right" | "left"): TPosition => {
            if (!canvasContainer) return { x: 0, y: 0, type };
            let x;
            const y =
                element.getBoundingClientRect().y -
                canvasContainer.getBoundingClientRect().y +
                element.getBoundingClientRect().height / 2;
            if (type === "right") {
                x =
                    element.getBoundingClientRect().x -
                    canvasContainer.getBoundingClientRect().x +
                    element.getBoundingClientRect().width +
                    60;
            } else {
                x =
                    element.getBoundingClientRect().x -
                    canvasContainer.getBoundingClientRect().x -
                    60;
            }

            return { x, y, type };
        },
        [canvasContainer]
    );

    const drawTwoCurves = useCallback(
        (start: TPosition, end: TPosition, direction: "LTR" | "RTL") => {
            if (!ctx) return;
            const controlPoint1 = {
                x: start.x,
                y: start.y + (end.y - start.y) / 2,
            };
            const endPoint1 = {
                x:
                    direction === "LTR"
                        ? start.x + (end.x - start.x) / 2
                        : end.x + (start.x - end.x) / 2,
                y: start.y + (end.y - start.y) / 2,
            };

            const controlPoint2 = {
                x: end.x,
                y: start.y + (end.y - start.y) / 2,
            };
            const endPoint2 = {
                x: end.x,
                y: end.y,
            };
            ctx.beginPath();
            ctx.setLineDash([15, 10]);
            ctx.strokeStyle = "rgba(255,255,255,.7)";
            ctx.lineWidth = 4;
            ctx.moveTo(start.x, start.y);
            ctx.quadraticCurveTo(controlPoint1.x, controlPoint1.y, endPoint1.x, endPoint1.y);
            ctx.stroke();

            ctx.beginPath();
            ctx.setLineDash([15, 10]);
            ctx.strokeStyle = "rgba(255,255,255,.7)";
            ctx.moveTo(endPoint1.x, endPoint1.y);
            ctx.quadraticCurveTo(controlPoint2.x, controlPoint2.y, endPoint2.x, endPoint2.y);
            ctx.lineWidth = 4;
            ctx.moveTo(controlPoint1.x, controlPoint1.y);

            ctx.stroke();
        },
        [ctx]
    );

    const drawOneCurve = useCallback(
        (start: TPosition, end: TPosition, direction: "LTR" | "RTL") => {
            if (!ctx) return;
            const controlPoint = {
                x: direction === "LTR" ? end.x : start.x,
                y: direction === "LTR" ? start.y : end.y,
            };
            ctx.beginPath();
            ctx.setLineDash([15, 10]);
            ctx.strokeStyle = "rgba(255,255,255,.7)";
            ctx.lineWidth = 4;
            ctx.moveTo(start.x, start.y);
            ctx.quadraticCurveTo(controlPoint.x, controlPoint.y, end.x, end.y);
            ctx.stroke();
        },
        [ctx]
    );

    useEffect(() => {
        if (!allParagraph.length || !canvasContainer || !canvasRef.current || !canvas || !ctx)
            return;

        //Set the space of canvas
        canvas.width = canvasContainer.getBoundingClientRect().width;
        canvas.height = canvasContainer.getBoundingClientRect().height;

        const positionArr = Array.from(allParagraph).map((p, i) =>
            i <= 4 ? getPosition(p, "right") : getPosition(p, "left")
        );

        //Draw Curves
        drawOneCurve(positionArr[0], positionArr[5], "LTR");
        drawTwoCurves(positionArr[5], positionArr[1], "RTL");
        drawTwoCurves(positionArr[1], positionArr[6], "LTR");
        drawTwoCurves(positionArr[6], positionArr[2], "RTL");
        drawTwoCurves(positionArr[2], positionArr[7], "LTR");
        drawTwoCurves(positionArr[7], positionArr[3], "RTL");
        drawTwoCurves(positionArr[3], positionArr[8], "LTR");
        drawOneCurve(positionArr[8], positionArr[4], "RTL");

        //Draw Points
        positionArr.forEach((position) => {
            if (!position?.x || !position.y) return;
            ctx.beginPath();
            ctx.lineWidth = 3;
            ctx.arc(position?.x, position?.y, 15, 0, 360, false);
            position.type === "left" ? (ctx.fillStyle = "#F38D54") : (ctx.fillStyle = "#00A3D8");
            ctx.fill();
        });
    }, [allParagraph, canvas, canvasContainer, ctx, drawOneCurve, drawTwoCurves, getPosition]);
    return (
        <canvas
            className="absolute top-0 bottom-0 left-0 right-0 lg:block hidden"
            ref={canvasRef}
        ></canvas>
    );
}

export default RoadMapCanvas;
