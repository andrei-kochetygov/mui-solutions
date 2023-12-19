import { createContext, useContext } from 'react';

export const createProviderContext = <ProvidableValue>(name: string) => {
  const Context = createContext<ProvidableValue | undefined>(undefined);

  function useGenericContext() {
    const context = useContext(Context);

    if (!context) {
      throw new Error(`use${name}() must be used within a ${name}Provider`);
    }

    return context;
  }

  return [Context, useGenericContext] as const;
};
