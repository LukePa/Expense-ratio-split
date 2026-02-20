
export function useLocalStorage(): boolean {
    return import.meta.env.VITE_USE_LOCAL_STORAGE ?? false;
}

