var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
import React from 'react';
import { useState } from 'react';
import { renderHook, act } from '@testing-library/react';
import { createContextOver } from '../index';
const useCountTestHook = ({ passedByContextObject }) => {
    const [count, setCount] = useState(0);
    const incrementCount = () => setCount((currentCount) => currentCount + 1);
    return { count, incrementCount, passedByContextObject };
};
describe('createContextOver utility - hook with props', () => {
    const passedByContextObject = { key: 'initial' };
    const useCountTestHookContext = createContextOver(useCountTestHook);
    it.skip('should make a context out of a react hook', () => {
        const { result } = renderHook(() => useCountTestHookContext.useContext(), {
            wrapper: (_a) => {
                var { children } = _a, initialProps = __rest(_a, ["children"]);
                return (React.createElement(useCountTestHookContext.ProvideContext, Object.assign({}, initialProps), children));
            },
            initialProps: { passedByContextObject },
        });
        expect(result.current.count).toEqual(0);
        expect(result.current.passedByContextObject).toBe(passedByContextObject);
    });
    it.skip('should throw an error if a provider is not found by the consumer of the context', () => {
        expect(renderHook(() => useCountTestHookContext.useContext())).toThrowError();
    });
    it('should provide same passed down by prop value on context state change', () => {
        const { result } = renderHook(() => useCountTestHookContext.useContext(), {
            wrapper: (_a) => {
                var { children } = _a, initialProps = __rest(_a, ["children"]);
                return (React.createElement(useCountTestHookContext.ProvideContext, Object.assign({}, initialProps), children));
            },
            initialProps: { passedByContextObject },
        });
        expect(result.current.count).toEqual(0);
        act(() => {
            result.current.incrementCount();
        });
        expect(result.current.count).toEqual(1);
    });
    it.skip('should rerender children on provider props change', () => __awaiter(void 0, void 0, void 0, function* () {
        const { result, rerender } = renderHook(() => useCountTestHookContext.useContext(), {
            wrapper: (_a) => {
                var { children } = _a, initialProps = __rest(_a, ["children"]);
                return (React.createElement(useCountTestHookContext.ProvideContext, Object.assign({}, initialProps), children));
            },
            initialProps: {
                passedByContextObject,
            },
        });
        expect(result.current.count).toEqual(0);
        expect(result.current.passedByContextObject).toBe(passedByContextObject);
        const newPassedByContextObject = { key: 'new' };
        rerender({
            passedByContextObject: newPassedByContextObject,
        });
        expect(result.current.passedByContextObject).toBe(newPassedByContextObject);
    }));
});
