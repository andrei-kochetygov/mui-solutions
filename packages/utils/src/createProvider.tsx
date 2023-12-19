import { useMemo } from 'react';
import { createProviderContext } from './createProviderContext';

export function createProvider<
  ProvidableValue,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- we don't know what the props will be passed
  ComputeProvidableValueCallback extends (props: any) => ProvidableValue,
>(name: string, computeProvidableValue: ComputeProvidableValueCallback) {
  const [Context, useContext] = createProviderContext<ReturnType<ComputeProvidableValueCallback>>(name);

  const Provider = <Props extends Parameters<ComputeProvidableValueCallback>[0]>(props: Props) => {
    const providableValue = useMemo(
      () => computeProvidableValue(props) as ReturnType<ComputeProvidableValueCallback>,
      [props],
    );

    return <Context.Provider value={providableValue}>{props.children}</Context.Provider>;
  };

  return [Provider, useContext, Context] as const;
}
