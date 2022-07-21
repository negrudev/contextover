import React from 'react';
import { useState } from 'react';
import { renderHook, act } from '@testing-library/react';
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
            wrapper: ({ children }) => (React.createElement(useCountTestHookContext.ProvideContext, null, children)),
        });
        expect(result.current.count).toEqual(0);
    });
    it.skip('should throw an error if a provider is not found by the consumer of the context', () => {
        expect(renderHook(() => useCountTestHookContext.useContext())).toThrow();
    });
    it('should provide new values on context state change', () => {
        const { result } = renderHook(() => useCountTestHookContext.useContext(), {
            wrapper: ({ children }) => (React.createElement(useCountTestHookContext.ProvideContext, null, children)),
        });
        expect(result.current.count).toEqual(0);
        act(() => {
            result.current.incrementCount();
        });
        expect(result.current.count).toEqual(1);
    });
});
