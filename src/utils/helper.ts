interface ParseURLQUeryParamsToObjFunc {
    <T extends {[key:string]: string}>(queryParams: string): T 
}

/** Parse query parameters to an object */
export const parseURLQueryParamsToObj: ParseURLQUeryParamsToObjFunc = (queryParams: string) => {
    const queryParamsObj = {} as any;


    if(queryParams.length) {
        queryParams.replace('?', '').split('&').forEach(param => {
            const [key, value] = param.split('=');
            queryParamsObj[key] = value;
        });
    }
    
    return queryParamsObj;
};