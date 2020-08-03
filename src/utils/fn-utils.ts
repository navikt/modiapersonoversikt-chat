export function omit<S extends {}, T extends keyof S>(obj: S, exclude: T): Omit<S, T> {
    return Object.entries(obj)
        .filter(([key]) => key !== exclude)
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value}), {}) as Omit<S, T>;
}
