import React from 'react';
interface ProviderProps<T = undefined> {
    initialProps: T;
}
interface ContextService<Value, InitialProps = void> {
    ProvideContext: React.FC<ProviderProps<InitialProps>>;
    useContext: () => Value;
}
export declare const createContextOver: <Result, InitialProps = undefined>(useHook: (initialProps: InitialProps) => Result) => ContextService<Result, InitialProps>;
export {};
