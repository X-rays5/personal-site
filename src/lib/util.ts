import {browser} from "$app/environment"

export function GetFilePathOnServer(path: string): string | URL {
    let url;
    if (browser) {
        url = new URL(`/${path}`, window.location.href);
    } else {
        url = new URL(`/${path}`, import.meta.url).href;
    }
    console.debug(`GetFilePathOnServer: ${url}`);
    return url;
}