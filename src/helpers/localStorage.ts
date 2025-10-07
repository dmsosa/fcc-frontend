
type Serializer<T> = {
    serialize: (v: Stored<T> ) => string;
    deserialize: (s: string) => T | null;
};



export const JSONSerializer: Serializer<any> = {
    serialize: (v) => JSON.stringify(v),
    deserialize: (s) => {
    try {
        return JSON.parse(s);
    } catch (e) {
        return null;
    }
    },
};

export type LSOptions<T> = {
/** optional custom serializer */
serializer?: Serializer<T>;
/** optional time-to-live in milliseconds */
ttl?: number;
/** optional namespace prefix for keys */
ns?: string;
};


type Stored<T> = {
    value: T;
    expiresAt: number | null;
};



export function keyWithNs(ns: string | undefined, key: string) {
    return ns ? `${ns}:${key}` : key;
}



export function now() {
    return Date.now();
}

export function setValueLocal<T>(key: string, value: T,  options?: LSOptions<T>): boolean {
    const serializer = options?.serializer ?? JSONSerializer;
    const ns = options?.ns;
    const ttl = options?.ttl || null; 
    const expiresAt = ttl ? now() + ttl : null;
    const payload: Stored<T> = { value, expiresAt }; 
    try {
        const raw = serializer.serialize(payload);
        localStorage.setItem(keyWithNs(ns, key), raw);
        window.dispatchEvent(new CustomEvent("r89:local-storage", { detail: { key, ns }}))
        return true;
    } catch (error) {
        console.warn("setLocal error", error);
        window.dispatchEvent(new CustomEvent("r89:local-storage", { detail: { key, ns, error } }));
        return false;
    }
}

export function getValueLocal<T>(key: string, options?: LSOptions<T>) : T | null {
    const serializer = options?.serializer ?? JSONSerializer;
    const ns = options?.ns;
  try {
    const raw = localStorage.getItem(keyWithNs(ns, key));
    if (raw == null) return null;
    const parsed = serializer.deserialize(raw) as Stored<T> | null;
    if (!parsed) return null;
    if (parsed.expiresAt && parsed.expiresAt <= now()) {
      // expired
      localStorage.removeItem(keyWithNs(ns, key));
      return null;
    }
    return parsed.value;    } catch (error) {
        console.warn("getLocal error", error);
        window.dispatchEvent(new CustomEvent("r89:local-storage", { detail: { key, ns, error } }));
        return null;
    }
}
export function removeValueLocal(key: string, options?: { ns?: string }) {
  const ns = options?.ns;
  try {
    localStorage.removeItem(keyWithNs(ns, key));
    window.dispatchEvent(new CustomEvent("r89:local-storage", { detail: { key, ns } }));
    return true;
  } catch (e) {
    console.warn("removeLocal error", e);
    return false;
  }
}

export function clearNamespace(ns?: string) {
  if (!ns) {
    localStorage.clear();
    window.dispatchEvent(new CustomEvent("r89:local-storage:clear"));
    return;
  }
  const prefix = `${ns}:`;
  const toRemove: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && k.startsWith(prefix)) toRemove.push(k);
  }
  toRemove.forEach((k) => localStorage.removeItem(k));
  window.dispatchEvent(new CustomEvent("r89:local-storage:clear", { detail: { ns } }));
}

export function sliceArray<T>(array: T[], offset?: number, limit?: number) : T[] {
    if (!limit) return array;
    const from = offset && offset > 0 ? offset * limit : 0;
    const to = limit > 0 ? from + limit : undefined;
    return array.slice(from, to);
}

