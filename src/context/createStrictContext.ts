import React from 'react'

export function createStrictContext<T>(
  options: {
    errorMessage?: string
    displayName?: string
  } = {}
) {
  const StrictContext = React.createContext<T | undefined>(undefined)
  StrictContext.displayName = options.displayName // for DevTools
  function useStrictContext() {
    const context = React.useContext(StrictContext)
    if (context === undefined) {
      throw new Error(
        options.errorMessage || `${options.displayName || ''} Context Provider is missing`
      )
    }
    return context
  }

  return [useStrictContext, StrictContext.Provider] as [() => T, React.Provider<T>]
}
