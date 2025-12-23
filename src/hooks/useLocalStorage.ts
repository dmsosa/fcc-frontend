import { useEffect, useRef, useState } from "react";
import { getLS, setLS, removeLS, type LSOptions, keyWithNs } from "../helpers/localStorageHelpers";

//Prufen, ob Key schon gespeichert ist und gegebenenfalls der entsprechende Wert zuruckgibt.
//Falls nicht, ein vorgegebenes "initValue" geliefert werden sollen.


export function useLocalStorage<T>(key: string, initValue: T | (() => T), options?: LSOptions<T>) : [ T, (v: T | ((prev: T) => T)) => void, () => void ] {
    const ns = options?.ns;
    const mounted = useRef(false);
    const getValueHook = (): T => {
        const stored = getLS<T>(key, options);
        if (stored !== null) return stored;
        return typeof initValue === "function" ? (initValue as () => T)() : initValue;
    }
    const [ value, setValue ] = useState<T>(getValueHook());
    useEffect(() => {
    mounted.current = true;

    function handleStorageEvent(e: StorageEvent) {
      // fired in other tabs
      const fullKey = keyWithNs(ns, key);
      if (e.key && e.key !== fullKey) return;
      // read latest
      // wenn kein Wert auf LocalStorage gespeichert ist, liefern wir die angegebenes Initial Value an
      const latest = getLS<T>(key, options);
      if (latest === null) return setValue(getValueHook());
      setValue(latest as T);
    }

    function handleCustomEvent() {
      // same-tab dispatch
      const latest = getLS<T>(key, options);
      if (latest === null) return setValue(getValueHook());
      setValue(latest as T);
    }

    window.addEventListener("storage", handleStorageEvent);
    window.addEventListener("fcc:local-storage", handleCustomEvent as EventListener);

    return () => {
      window.removeEventListener("storage", handleStorageEvent);
      window.removeEventListener("fcc:local-storage", handleCustomEvent as EventListener);
      mounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, ns]);

    //Neues Wert auf LS und auch auf HookState setzen.  
    const setLocalStorageHook = (val: T | ((prev: T) => T), setLocally:boolean=true) => {
      try {
        const newValue = val instanceof Function ? (val as (p: T) => T)(value) : val;
        if (setLocally) {
          setLS<T>(key, newValue, options);
        }
        // update local state immediately
        setValue(newValue);
        } catch (e) {
        console.warn("setLocalStorageHook error", e);
        }
    };

    const rmLocalStorageHook = () => {
        try {
            removeLS(key, { ns });
            // revert to initial
            const init = typeof initValue === "function" ? (initValue as () => T)() : initValue;
            setValue(init);
        } catch (error) {
            console.warn('rmLocalStorageHook remove error', error);
        }
    }
 return [value, setLocalStorageHook, rmLocalStorageHook ];
}
