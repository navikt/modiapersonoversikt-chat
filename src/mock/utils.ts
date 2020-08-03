function rnd(start: number, end: number): number {
    const delta = end - start;
    const offset = Math.round(Math.random() * delta);
    return start + offset;
}
export function jittery(start: number, end: number, fn: () => void) {
    const delay = rnd(start, end);

    setTimeout(() => {
        fn();
        jittery(start, end, fn);
    }, delay);
}
