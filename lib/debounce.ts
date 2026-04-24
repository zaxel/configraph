
export function debounce<T extends (...args: any[]) => void>(cb: T, t: number) {
    let timer: ReturnType<typeof setTimeout> | null = null;

    return function (...args: Parameters<T>) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            cb(...args);
        }, t);
    };
}