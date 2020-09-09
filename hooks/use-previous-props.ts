import { useRef, useEffect } from 'react';

export function usePreviousProps<T = any>(value: T) {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current as T;
}
