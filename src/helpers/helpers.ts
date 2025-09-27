type Serializer<T> = {
    serialize: (v: Stored<T>) => string;
    deserialize: (s: string) => T | null;
};



// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const JSONSerializer: Serializer<any> = {
    serialize: (v) => JSON.stringify(v),
    deserialize: (s) => {
    try {
        return JSON.parse(s);
    } catch (error) {
        console.warn("setLocal error", error);
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

export function setLocal<T>(key: string, value: T, options?: LSOptions<T>): boolean {
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
        return false;
    }
}

export function getLocal<T>(key: string, options?: LSOptions<T>): T | null {
  const serializer = options?.serializer ?? JSONSerializer;
  const ns = options?.ns;
  try {
    const raw = localStorage.getItem(keyWithNs(ns, key));
    if (raw === null) return null;
    const parsed = serializer.deserialize(raw) as Stored<T> | null;
    if (!parsed) return null;
    if (parsed.expiresAt && parsed.expiresAt <= now()) {
      // expired
      localStorage.removeItem(keyWithNs(ns, key));
      return null;
    }
    return parsed.value;
  } catch (e) {
    console.warn("getLocal error", e);
    return null;
  }
}

export function removeLocal(key: string, options?: { ns?: string }) {
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