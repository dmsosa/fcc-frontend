import { useEffect, useRef, useState } from "react";
import { getValueLocal, setValueLocal, removeValueLocal, type LSOptions, keyWithNs } from "../helpers/helpers";

export function useLS<T>(key: string, initValue: T | (() => T), options?: LSOptions<T>) : [ T, (v: T | ((prev: T) => T)) => void, () => void ] {
    const ns = options?.ns;
    const mounted = useRef(false);
    const readValueLocal = (): T => {
        const stored = getValueLocal<T>(key, options); 
        return stored ?? typeof initValue === "function" ? (initValue as () => T)() : initValue;
    }
    const [ value, setValue ] = useState<T>(readValueLocal());

  useEffect(() => {
    mounted.current = true;

    function handleStorageEvent(e: StorageEvent) {
      // fired in other tabs
      const fullKey = keyWithNs(ns, key);
      if (e.key && e.key !== fullKey) return;
      // read latest
      const latest = getValueLocal<T>(key, options);
      if (latest === null) return setValue(readValueLocal());
      setValue(latest as T);
    }

    function handleCustomEvent() {
      // same-tab dispatch
      const latest = getValueLocal<T>(key, options);
      if (latest === null) return setValue(readValueLocal());
      setValue(latest as T);
    }

    window.addEventListener("storage", handleStorageEvent);
    window.addEventListener("r89:local-storage", handleCustomEvent as EventListener);

    return () => {
      window.removeEventListener("storage", handleStorageEvent);
      window.removeEventListener("r89:local-storage", handleCustomEvent as EventListener);
      mounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, ns]);

    const setLS = (val: T | ((prev: T) => T)) => {
        try {
        const newValue = val instanceof Function ? (val as (p: T) => T)(value) : val;
        setValueLocal<T>(key, newValue, options);
        // update local state immediately
        setValue(newValue);
        } catch (e) {
        console.warn("useLocalStorage setValue error", e);
        }
    };

    const rmLS = () => {
        try {
            removeValueLocal(key, { ns });
            // revert to initial
            const init = typeof initValue === "function" ? (initValue as () => T)() : initValue;
            setValue(init);
        } catch (error) {
            console.warn('useLocalStorage remove error', error);
        }
    }
 return [value, setLS, rmLS ];
}
