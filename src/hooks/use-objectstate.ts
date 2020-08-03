import {Dispatch, SetStateAction, useMemo, useState} from "react";

export type ObjectState<S> = {
    value: S;
    setValue: Dispatch<SetStateAction<S>>
}
export function useObjectState<S>(initialState: S | (() => S)): ObjectState<S> {
    const [value, setValue] = useState<S>(initialState);

    return useMemo(() => ({
        value,
        setValue
    }), [value]);
}
