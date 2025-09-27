import { useEffect, useRef, useState } from "react";
import { getLocal, keyWithNs, removeLocal, setLocal, type LSOptions } from "../helpers/helpers";


// react-local-storage-helper.ts
// A small, well-typed LocalStorage helper + React hook with TTL, namespacing and cross-tab sync.


export function useLS<T>({ key, initValue, options } : { key: string, initValue: T | (() => T), options?: LSOptions<T>}) {
    const ns = options?.ns;
    const mounted = useRef(false);

    const readValueFromLS = () => {
        const stored = getLocal<T>('key', options);
        return stored ?? typeof initValue === 'function' ? (initValue as  () => T)() : initValue;
    } 
    const [ value, setValue ] = useState(readValueFromLS());

    const setLS = (val: T | (() => T )) => {
        try {
            const newValue = val instanceof Function ? (val as (p: T) => T)(value) : val;
            setLocal<T>(key, newValue, options);
            // update local state immediately
            setValue(newValue);

        } catch (error) {
            console.warn("useLocalStorage setValue error", error);
        }
    }
    const rmLS = () => {
        removeLocal('key', { ns: options?.ns });
        //Zu initiales Zustand zurucksetzen
        setValue(typeof initValue === "function" ? (initValue as () => T)() : initValue);
    }
    //zu Ereignisse reagieren
    useEffect(() => {
    mounted.current = true;

    function handleStorageEvent(e: StorageEvent) {
      // fired in other tabs
      const fullKey = keyWithNs(ns, key);
      if (e.key && e.key !== fullKey) return;
      // read latest
      const latest = getLocal<T>(key, options);
      if (latest === null) return setValue(readValueFromLS());
      setValue(latest as T);
    }

    function handleCustomEvent() {
      // same-tab dispatch
      const latest = getLocal<T>(key, options);
      if (latest === null) return setValue(readValueFromLS());
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

  return [ value, setLS, rmLS ];
}

/*
USAGE (short)

import { useLocalStorage, setLocal, getLocal, removeLocal } from './react-local-storage-helper';

const [token, setToken, removeToken] = useLocalStorage<string>('auth.token', '');

setLocal('count', 0, { ttl: 1000 * 60 * 60, ns: 'my-app' });
const count = getLocal<number>('count', { ns: 'my-app' });

*/
