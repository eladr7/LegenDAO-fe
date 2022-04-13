export type TActionStage = "pending" | "fulfilled" | "rejected";

export type TBasicAPIResponse = {
    data: Record<string, unknown>;
};

export interface IAbortSignal {
    id: string;
    delegate: () => void;
    abort(): void;
}

export class AbortSignal implements IAbortSignal {
    static ABORT = "ABORT";
    protected _id = `${AbortSignal.ABORT}-${Date.now()}`;
    protected _delegate: () => void = () => undefined;

    public get id(): string {
        return this._id;
    }

    public set delegate(v: () => void) {
        this._delegate = v;
    }

    abort() {
        this._delegate();
    }
}

export type TFetch<R = unknown, O = Record<string, unknown>, A = IAbortSignal> = (
    options: O,
    abortSignal?: A
) => Promise<R>;
export type TFetchCreator<R = unknown, O = Record<string, unknown>, A = IAbortSignal> = (
    fn: TFetch<R, O, A>,
    abortSignal?: A
) => TFetch<R>;

export type TSend<R = unknown, O = Record<string, unknown>, A = IAbortSignal> = (
    options: O,
    abortSignal?: A
) => Promise<R>;

export function sendCreator<R, O>(send: (options: O) => Promise<R>): TSend<R, O> {
    return (options, abortSignal?) => {
        return new Promise((resolve, reject) => {
            abortSignal?.abort();
            const delay = (options as Record<string, unknown>).delay;
            if (!delay || typeof delay !== "number") {
                resolve(send(options));
                return;
            }
            const timer = setTimeout(() => {
                resolve(send(options));
            }, delay);

            if (!abortSignal) return;
            abortSignal.delegate = () => {
                clearTimeout(timer);
                reject(abortSignal.id);
            };
        });
    };
}

/**
 * A fetch creator `closure`
 * @param fn
 * @returns
 */
export function attachAbortController<R = unknown, O = Record<string, unknown>>(
    fn: TFetch<R, O, IAbortSignal> | TSend<R, O, IAbortSignal>
): TFetch<R, O, IAbortSignal> | TSend<R, O, IAbortSignal> {
    // let preSignal: undefined | IAbortSignal;
    const defaultAbortSignal = new AbortSignal();

    return async (options: O, abortSignal?: IAbortSignal) => {
        abortSignal = abortSignal || defaultAbortSignal;
        return fn(options, abortSignal);

        // if (preSignal) {
        //     preSignal.abort();
        // }
        // preSignal = abortSignal;
        try {
            return await fn(options, abortSignal);
        } finally {
            // preSignal = undefined;
        }
    };
}
