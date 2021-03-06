import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { createContextOver } from '../index';
const useCountTestHook = () => {
    const [count, setCount] = useState(0);
    const incrementCount = () => setCount((currentCount) => currentCount + 1);
    return { count, incrementCount };
};
describe('createContextOver utility - no props hook', () => {
    const useCountTestHookContext = createContextOver(useCountTestHook);
    it('should make a context out of a react hook', () => {
        const { result } = renderHook(() => useCountTestHookContext.useContext(), {
            wrapper: ({ children }) => (_jsx(useCountTestHookContext.ProvideContext, { children: children }, void 0)),
        });
        expect(result.current.count).toEqual(0);
        expect(result.error).toBeUndefined();
    });
    it('should throw an error if a provider is not found by the consumer of the context', () => {
        const { result } = renderHook(() => useCountTestHookContext.useContext());
        expect(result.error).not.toBeUndefined();
    });
    it('should provide new values on context state change', () => {
        const { result } = renderHook(() => useCountTestHookContext.useContext(), {
            wrapper: ({ children }) => (_jsx(useCountTestHookContext.ProvideContext, { children: children }, void 0)),
        });
        expect(result.current.count).toEqual(0);
        act(() => {
            result.current.incrementCount();
        });
        expect(result.current.count).toEqual(1);
    });
});
