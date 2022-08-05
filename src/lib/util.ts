import {browser} from "$app/env";

export function GetFilePathOnServer(path: String): string | URL {
    let url;
    if (browser) {
        url = new URL(`/${path}`, window.location.href);
    } else {
        url = new URL(`/${path}`, import.meta.url).href;
    }
    console.debug(`GetFilePathOnServer: ${url}`);
    return url;
}