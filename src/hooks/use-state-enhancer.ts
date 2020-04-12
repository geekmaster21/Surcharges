import { useState, useEffect, useLayoutEffect } from 'react';

const useStateWithCallback = <T = any>(initialState: T, callback: (state: T) => void) => {
    const [state, setState] = useState(initialState);

    useEffect(() => callback(state), [state, callback]);

    return [state, setState];
};

const useStateWithCallbackInstant = <T = any>(initialState: T, callback: (state: T) => void) => {
    const [state, setState] = useState(initialState);

    useLayoutEffect(() => callback(state), [state, callback]);

    return [state, setState];
};

export { useStateWithCallback, useStateWithCallbackInstant };
