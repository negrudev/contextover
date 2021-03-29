var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
const MISSING_CONTEXT = Symbol();
export const createContextOver = (useHook) => {
    const Context = React.createContext(MISSING_CONTEXT);
    const ProvideContext = (_a) => {
        var { children } = _a, props = __rest(_a, ["children"]);
        const hookValue = useHook(props);
        return _jsx(Context.Provider, Object.assign({ value: hookValue }, { children: children }), void 0);
    };
    const useContext = () => {
        const value = React.useContext(Context);
        if (value === MISSING_CONTEXT)
            throw new Error(`Component ${useHook.name} is consuming a context without a Provider. Wrap it inside a Provider (${useHook.name}.ProvideContext)`);
        return value;
    };
    return {
        ProvideContext,
        useContext,
    };
};
