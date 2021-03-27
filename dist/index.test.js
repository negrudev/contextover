import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { createContextService } from './index';
const useCountTestHook = (passedByContextString) => {
    const [count, setCount] = useState(0);
    const incrementCount = () => setCount((currentCount) => currentCount + 1);
    return { count, incrementCount, passedByContextString };
};
describe('createContext utility', () => {
    const useCountTestHookContext = createContextService(useCountTestHook);
    it('should make a context out of a react hook', () => {
        const stringToPassByContext = 'alium';
        const { result } = renderHook(() => useCountTestHookContext.useContext(), {
            // eslint-disable-next-line react/display-name
            wrapper: ({ children, testString }) => (_jsx(useCountTestHookContext.ProvideContext, Object.assign({ initialProps: testString }, { children: children }), void 0)),
            initialProps: { testString: stringToPassByContext },
        });
        expect(result.current.count).toEqual(0);
        expect(result.current.passedByContextString).toEqual(stringToPassByContext);
        expect(result.error).toBeUndefined();
    });
    it('should throw an error if a provider is not found by the consumer of the context', () => {
        const { result } = renderHook(() => useCountTestHookContext.useContext());
        expect(result.error).not.toBeUndefined();
    });
    it('should provide new values on context state change', () => {
        const { result } = renderHook(() => useCountTestHookContext.useContext(), {
            // eslint-disable-next-line react/display-name
            wrapper: ({ children, initialProps }) => (_jsx(useCountTestHookContext.ProvideContext, Object.assign({}, { initialProps }, { children: children }), void 0)),
            initialProps: undefined,
        });
        expect(result.current.count).toEqual(0);
        act(() => {
            result.current.incrementCount();
        });
        expect(result.current.count).toEqual(1);
    });
    it('should rerender children on provider props change', () => {
        const stringToPassByContext = 'alium';
        const { result, rerender } = renderHook(() => useCountTestHookContext.useContext(), {
            // eslint-disable-next-line react/display-name
            wrapper: ({ children, testString }) => (_jsx(useCountTestHookContext.ProvideContext, Object.assign({ initialProps: testString }, { children: children }), void 0)),
            initialProps: {
                testString: stringToPassByContext,
            },
        });
        expect(result.current.count).toEqual(0);
        expect(result.current.passedByContextString).toEqual(stringToPassByContext);
        const newStringToPassByContext = 'new-alium';
        rerender({
            testString: newStringToPassByContext,
        });
        expect(result.current.passedByContextString).toEqual(newStringToPassByContext);
    });
});
