import { useState, useEffect, useCallback } from 'react'

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}

export function useDebouncedCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => void {
  // Keep track of the latest callback
  const callbackRef = useCallback(callback, [callback])
  
  // Create a debounced function
  return useCallback(
    (...args: Parameters<T>) => {
      // Use setTimeout to debounce the callback
      const timer = setTimeout(() => {
        callbackRef(...args)
      }, delay)

      return () => {
        clearTimeout(timer)
      }
    },
    [callbackRef, delay]
  )
}