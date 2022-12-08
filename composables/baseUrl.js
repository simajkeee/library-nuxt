export function useBaseUrl() {
    const config = useRuntimeConfig();
    return config.API_BASE_URL;
}