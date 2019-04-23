export const isDefined = obj => obj !== undefined && obj !== null;
export const isDefinedProp = (obj: Object, field: string) => isDefined(obj) && obj.hasOwnProperty(field);
export const parseJwt = jwt => {
    if (!isDefined(jwt)) {
        return null;
    }
    const split: string[] = jwt.split('.');
    if (split.length === 3) {
        return JSON.parse(window.atob(split[1].replace(/-/g, '+').replace(/_/g, '/')));
    }
    return null;
}