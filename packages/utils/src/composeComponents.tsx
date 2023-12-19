import { ComponentType, ReactNode } from 'react';

export type ComponentWithPropsPair<Props extends Record<string, unknown> = Record<string, unknown>> = [
  ComponentType<Props>,
  Props,
];

export type CompositionProps = { children?: ReactNode };

export function composeComponents(componentWithPropsPairs?: ComponentWithPropsPair[]) {
  return ({ children: compositionChildren }: CompositionProps) => {
    if (!componentWithPropsPairs || componentWithPropsPairs.length < 1) return compositionChildren;

    return componentWithPropsPairs.reduceRight(
      (children, [Component, props]) => <Component {...props}>{children}</Component>,
      compositionChildren,
    );
  };
}
