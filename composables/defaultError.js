export function useDefaultError(error) {
    console.log("Listen useDefaultError composable: ");
    console.log(error);
    if (error.errors == undefined) {
        return {
            errors: {
                Error: ["Unable to procced a request. Please try again later."]
            }
        }
    } 
    return error;
}