import type { ComponentType, PropsWithChildren } from 'react'

export function withProvider<P extends object, ProviderProps extends object>(
  ProviderComponent: ComponentType<PropsWithChildren<ProviderProps>>,
  staticProviderProps: ProviderProps,
) {
  return function wrapWithProvider(WrappedComponent: ComponentType<P>) {
    return function ProviderWrapper(props: P) {
      const providerProps = {
        ...staticProviderProps,
        ...props,
      } as ProviderProps

      return (
        <ProviderComponent {...providerProps}>
          <WrappedComponent {...props} />
        </ProviderComponent>
      )
    }
  }
}
