import { PropsWithChildren } from 'react';
declare type ProvidedContext<ProviderProps = {}> = (props: PropsWithChildren<ProviderProps>) => JSX.Element;
interface ContextService<Value, ProviderProps = {}> {
    ProvideContext: ProvidedContext<ProviderProps>;
    useContext: () => Value;
}
export declare const createContextOver: <Result, ProviderProps = {}>(useHook: (props: ProviderProps) => Result) => ContextService<Result, ProviderProps>;
export {};
