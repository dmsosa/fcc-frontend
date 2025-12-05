export function sliceArray<T>(array: T[], offset?: number, limit?: number) : T[] {
    if (!limit) return array;
    const from = offset && offset > 0 ? offset * limit : 0;
    const to = limit > 0 ? from + limit : undefined;
    return array.slice(from, to);
}

