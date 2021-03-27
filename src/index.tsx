import React from 'react';

const MISSING_CONTEXT = Symbol();

interface ProviderProps<T = undefined> {
  initialProps: T;
}

interface ContextService<Value, InitialProps = void> {
  ProvideContext: React.FC<ProviderProps<InitialProps>>;
  useContext: () => Value;
}

export const createContextService = <Result, InitialProps = undefined>(
  useHook: (initialProps: InitialProps) => Result
): ContextService<Result, InitialProps> => {
  const Context = React.createContext<Result | typeof MISSING_CONTEXT>(MISSING_CONTEXT);

  const ProvideContext: React.FC<ProviderProps<InitialProps>> = ({ initialProps, children }) => {
    const hookValue = useHook(initialProps);

    return <Context.Provider value={hookValue}>{children}</Context.Provider>;
  };

  const useContext = (): Result => {
    const value = React.useContext(Context);

    if (value === MISSING_CONTEXT)
      throw new Error(
        `Component ${useHook.name} is consuming a context without a Provider. Wrap it inside a Provider`
      );
    return value;
  };

  return {
    ProvideContext,
    useContext,
  };
};
