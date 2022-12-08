export function useDefaultError(error) {
    if (error.errors == undefined) {
        return {
            errors: {
                Error: ["Unable to procced a request. Please try again later."]
            }
        }
    } 
    return error;
}