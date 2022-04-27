import { useCallback, useEffect, useMemo, useRef } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { TRootState, TAppDispatch } from "./store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<TAppDispatch>();
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;

export const useMouseClick = (callback: (event: MouseEvent) => void, root?: HTMLElement) => {
    const rfCallback = useRef(callback);
    const handleMouseClick = useCallback((event: MouseEvent) => {
        rfCallback.current(event);
    }, []);

    useEffect(() => {
        rfCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        if (root) {
            root.addEventListener("click", handleMouseClick);
        } else {
            document.addEventListener("click", handleMouseClick);
        }

        return () => {
            if (root) {
                root.removeEventListener("click", handleMouseClick);
            } else {
                document.removeEventListener("click", handleMouseClick);
            }
        };
    }, [handleMouseClick, root]);
};

export const useCtrlKeyPress = (keys: string[], callback: (event: KeyboardEvent) => void) => {
    // implement the callback ref pattern
    const rfCallback = useRef(callback);

    // hanle what happens on key press
    const handleKeyPress = useCallback(
        (event: KeyboardEvent) => {
            // check if one of the key is part of the ones we want
            if (event.ctrlKey && keys.some((key) => event.key === key)) {
                event.preventDefault();
                rfCallback.current(event);
            }
        },
        [keys]
    );

    useEffect(() => {
        rfCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        document.addEventListener("keydown", handleKeyPress);

        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, [handleKeyPress]);
};

export const usePressKey = (keys: string[], callback: (event: KeyboardEvent) => void) => {
    // implement the callback ref pattern
    const rfCallback = useRef(callback);

    // hanle what happens on key press
    const handleKeyPress = useCallback(
        (event: KeyboardEvent) => {
            // check if one of the key is part of the ones we want
            if (keys.some((key) => event.key === key)) {
                event.preventDefault();
                rfCallback.current(event);
            }
        },
        [keys]
    );

    useEffect(() => {
        rfCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        document.addEventListener("keydown", handleKeyPress);

        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, [handleKeyPress]);
};

export const useActivePopups = () => {
    const list = useAppSelector((state) => state.application.popupList);
    return useMemo(() => list.filter((item) => item.show), [list]);
};
