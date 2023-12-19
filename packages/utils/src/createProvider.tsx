import { ReactNode, useMemo } from 'react';
import { createProviderContext } from './createProviderContext';

export type ProviderProps<Props> = Props & {
  children?: ReactNode;
};

export type ComputeProvidableValueCallback<Props, ProvidableValue> = (props: Props) => ProvidableValue;

export function createProvider<Props, ProvidableValue>(
  name: string,
  computeProvidableValue: ComputeProvidableValueCallback<Props, ProvidableValue>,
) {
  const [Context, useContext] = createProviderContext<ProvidableValue>(name);

  const Provider = (props: ProviderProps<Props>) => {
    const providableValue = useMemo(() => computeProvidableValue(props), [props]);

    return <Context.Provider value={providableValue}>{props.children}</Context.Provider>;
  };

  return [Provider, useContext, Context] as const;
}
