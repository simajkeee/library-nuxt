export function useDefaultHeaders() {
    return new Headers({
        "Accept": "application/json",
        "Content-Type": "application/json",
    });
}