type Serializer<T> = {
    serialize: (v: Stored<T>) => string;
    deserialize: (s: string) => T | null;
};



const JSONSerializer: Serializer<any> = {
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


function keyWithNs(ns: string | undefined, key: string) {
    return ns ? `${ns}:${key}` : key;
}


function now() {
    return Date.now();
}

function setLocalItem<T>(key: string, value: T, options?: LSOptions<T>): boolean {
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
















export function setLocal<T>(key: string, value: T, options?: LSOptions<T>) {
const serializer = options?.serializer ?? JSONSerializer;
const ttl = options?.ttl ?? null;
const ns = options?.ns;
const expiresAt = ttl ? now() + ttl : null;
const payload: Stored<T> = { value, expiresAt };
try {
const raw = serializer.serialize(payload);
localStorage.setItem(keyWithNs(ns, key), raw);
// dispatch custom event for same-tab listeners
window.dispatchEvent(new CustomEvent("r89:local-storage", { detail: { key, ns } }));
return true;
} catch (e) {
console.warn("setLocal error", e);
return false;
}
}