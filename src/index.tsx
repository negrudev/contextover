import React, { PropsWithChildren } from 'react';

const MISSING_CONTEXT = Symbol();

type ProvidedContext<ProviderProps = {}> = (props: PropsWithChildren<ProviderProps>) => JSX.Element;

interface ContextService<Value, ProviderProps = {}> {
  ProvideContext: ProvidedContext<ProviderProps>;
  useContext: () => Value;
}

export const createContextOver = <Result, ProviderProps = {}>(
  useHook: (props: ProviderProps) => Result
): ContextService<Result, ProviderProps> => {
  const Context = React.createContext<Result | typeof MISSING_CONTEXT>(MISSING_CONTEXT);

  const ProvideContext = ({ children, ...props }: PropsWithChildren<ProviderProps>) => {
    const hookValue = useHook(props as ProviderProps);

    return <Context.Provider value={hookValue}>{children}</Context.Provider>;
  };

  const useContext = (): Result => {
    const value = React.useContext(Context);

    if (value === MISSING_CONTEXT)
      throw new Error(
        `Component ${useHook.name} is consuming a context without a Provider. Wrap it inside a Provider (${useHook.name}.ProvideContext)`
      );
    return value;
  };

  return {
    ProvideContext,
    useContext,
  };
};
