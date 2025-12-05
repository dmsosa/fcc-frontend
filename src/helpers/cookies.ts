//Cookie helpers

export type TCookieOptions = {
  path?: string,
  domain?: undefined,
  secure?: false,
  sameSite?: 'Lax' | 'Strict' | 'None',
  expires?: Date | number;
  httpOnly?: boolean;
}
const defaultCookieOptions = {
  path: '/',
  domain: undefined,
  secure: false,
  sameSite: undefined,
  expires: undefined,
  httpOnly: false,
};

function _serialize(name: string, value: string | number | boolean, options: TCookieOptions = {}) {
  const opts = { ...defaultCookieOptions, ...options };
  let cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);

  if (opts.expires !== undefined) {
    let expires;
    if (opts.expires && opts.expires instanceof Date) {
      expires = opts.expires.toUTCString();
    } else if (typeof opts.expires === 'number') {
      const d = new Date();
      d.setTime(d.getTime() + opts.expires * 24 * 60 * 60 * 1000);
      expires = d.toUTCString();
    } else {
      // If it's a string, trust it (e.g. 'Tue, 19 Jan 2038 03:14:07 GMT')
      expires = opts.expires;
    }
    cookie += `; Expires=${expires}`;
  }

  if (opts.domain) cookie += `; Domain=${opts.domain}`;
  if (opts.path) cookie += `; Path=${opts.path}`;
  if (opts.secure) cookie += `; Secure`;
  if (opts.httpOnly) {
    // note: HttpOnly cannot be set by client JS; included for API completeness
    console.warn('httpOnly flag cannot be set via client-side JavaScript');
  }
  if (opts.sameSite) cookie += `; SameSite=${opts.sameSite}`;

  return cookie;
}


function _parseAll(): { [key: string]: string  } {
  const raw = document.cookie || '';
  if (!raw) return {};
  // split by '; ' but be careful about cookie values containing '='
  return raw.split(';').reduce((acc: { [key: string]: string }, part) => {
    const idx = part.indexOf('=');
    if (idx === -1) return acc;
    const name = decodeURIComponent(part.slice(0, idx).trim());
    const value = decodeURIComponent(part.slice(idx + 1));
    acc[name] = value;
    return acc;
  }, {});
}


const CookieHelper = {
  /**
   * set(name, value, options)
   * options: { path, domain, secure, sameSite, expires }
   * expires: Date object OR number-of-days OR string (UTC date)
   * value can be string or object (object will be JSON.stringified)
   */
  set(name: string, value: string | number | boolean, options: TCookieOptions = {}) {
    if (!name || typeof name !== 'string') {
      throw new Error('Cookie name must be a non-empty string');
    }
    let val = value;
    if (typeof value === 'object') {
      try {
        val = JSON.stringify(value);
        // prefix to help detect JSON when reading
        val = `j:${val}`;
      } catch (e) {
        throw new Error('Failed to serialize cookie value');
      }
    } else if (typeof value === 'number' || typeof value === 'boolean') {
      val = String(value);
    } else if (value === null) {
      val = '';
    }

    document.cookie = _serialize(name, val, options);
  },

  /**
   * get(name)
   * returns string or parsed object (if previously saved as JSON with this helper), or null if not found
   */
  get(name:string) {
    if (!name) return null;
    const all = _parseAll();
    if (!(name in all)) return null;
    const raw = all[name];

    if (raw.startsWith('j:')) {
      try {
        return JSON.parse(raw.slice(2));
      } catch (e) {
        // parsing failed; return raw without prefix
        return raw.slice(2);
      }
    }

    return raw;
  },

  /**
   * getAll()
   * returns an object with all cookies { name: value }
   * Note: JSON values will be parsed.
   */
  getAll() {
    const parsed = _parseAll();
    const out: { [key: string]: string  } = {};
    for (const k of Object.keys(parsed)) {
      const v = parsed[k];
      out[k] = v.startsWith('j:') ? (() => {
        try { return JSON.parse(v.slice(2)); } catch { return v.slice(2); }
      })() : v;
    }
    return out;
  },

  /**
   * remove(name, options)
   * options should include same path/domain as when the cookie was set
   */
  remove(name: string, options: TCookieOptions = {}) {
    // To delete a cookie, set it with an expiry in the past
    this.set(name, '', { ...options, expires: new Date(0) });
  },

  /**
   * clearAll(options)
   * attempts to delete all cookies. Note: will only delete cookies accessible to JS,
   * and domain/path must match. Use options to try different paths/domains if needed.
   */
  clearAll(options = {}) {
    const all = _parseAll();
    for (const name of Object.keys(all)) {
      this.remove(name, options);
    }
  },

  /**
   * exists(name)
   */
  exists(name: string) {
    return this.get(name) !== null;
  }
};

export default CookieHelper;