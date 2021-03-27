import { useState } from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { createContextOver } from './index';

const useCountTestHook = (passedByContextString?: string) => {
  const [count, setCount] = useState(0);

  const incrementCount = () => setCount((currentCount) => currentCount + 1);

  return { count, incrementCount, passedByContextString };
};

describe('createContextOver utility', () => {
  const useCountTestHookContext = createContextOver(useCountTestHook);

  it('should make a context out of a react hook', () => {
    const stringToPassByContext = 'context-string';
    const { result } = renderHook(() => useCountTestHookContext.useContext(), {
      wrapper: ({ children, testString }) => (
        <useCountTestHookContext.ProvideContext initialProps={testString}>
          {children}
        </useCountTestHookContext.ProvideContext>
      ),
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
      wrapper: ({ children, initialProps }) => (
        <useCountTestHookContext.ProvideContext {...{ initialProps }}>
          {children}
        </useCountTestHookContext.ProvideContext>
      ),
      initialProps: undefined,
    });

    expect(result.current.count).toEqual(0);

    act(() => {
      result.current.incrementCount();
    });

    expect(result.current.count).toEqual(1);
  });

  it('should rerender children on provider props change', () => {
    const stringToPassByContext = 'context-string';
    const { result, rerender } = renderHook(() => useCountTestHookContext.useContext(), {
      wrapper: ({ children, testString }) => (
        <useCountTestHookContext.ProvideContext initialProps={testString}>
          {children}
        </useCountTestHookContext.ProvideContext>
      ),
      initialProps: {
        testString: stringToPassByContext,
      },
    });

    expect(result.current.count).toEqual(0);
    expect(result.current.passedByContextString).toEqual(stringToPassByContext);

    const newStringToPassByContext = 'new-context-string';
    rerender({
      testString: newStringToPassByContext,
    });

    expect(result.current.passedByContextString).toEqual(newStringToPassByContext);
  });
});
