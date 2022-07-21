import React from 'react';
import { useState } from 'react';
import { renderHook, act } from '@testing-library/react';
import { createContextOver } from '../index';

const useCountTestHook = ({ passedByContextObject }: { passedByContextObject: object }) => {
  const [count, setCount] = useState(0);

  const incrementCount = () => setCount((currentCount) => currentCount + 1);

  return { count, incrementCount, passedByContextObject };
};

describe('createContextOver utility - hook with props', () => {
  const passedByContextObject = { key: 'initial' };
  const useCountTestHookContext = createContextOver(useCountTestHook);

  it.skip('should make a context out of a react hook', () => {
    const { result } = renderHook(() => useCountTestHookContext.useContext(), {
      wrapper: ({ children, ...initialProps }: any) => (
        <useCountTestHookContext.ProvideContext {...initialProps}>
          {children}
        </useCountTestHookContext.ProvideContext>
      ),
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
      wrapper: ({ children, ...initialProps }: any) => (
        <useCountTestHookContext.ProvideContext {...initialProps}>
          {children}
        </useCountTestHookContext.ProvideContext>
      ),
      initialProps: { passedByContextObject },
    });

    expect(result.current.count).toEqual(0);

    act(() => {
      result.current.incrementCount();
    });

    expect(result.current.count).toEqual(1);
  });

  it.skip('should rerender children on provider props change', async () => {
    const { result, rerender } = renderHook(() => useCountTestHookContext.useContext(), {
      wrapper: ({ children, ...initialProps }: any) => (
        <useCountTestHookContext.ProvideContext {...initialProps}>
          {children}
        </useCountTestHookContext.ProvideContext>
      ),
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
  });
});
