export function regExTrim(string){
    if(!string) return string;
    return string.replace(/^\s+/g, '');
}

export default {regExTrim}