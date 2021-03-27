import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
const MISSING_CONTEXT = Symbol();
export const createContextService = (useHook) => {
    const Context = React.createContext(MISSING_CONTEXT);
    const ProvideContext = ({ initialProps, children }) => {
        const hookValue = useHook(initialProps);
        return _jsx(Context.Provider, Object.assign({ value: hookValue }, { children: children }), void 0);
    };
    const useContext = () => {
        const value = React.useContext(Context);
        if (value === MISSING_CONTEXT)
            throw new Error(`Component ${useHook.name} is consuming a context without a Provider. Wrap it inside a Provider`);
        return value;
    };
    return {
        ProvideContext,
        useContext,
    };
};
