import { Status } from "https://deno.land/std/http/http_status.ts"

async function get(url:string, timeout:number=30000) {
    const ret:Record<string,any>={};
    try {
        const c=new AbortController();
        const id=setTimeout(() => c.abort(), timeout);
        const res=await fetch(url, {signal: c.signal});
        clearTimeout(id);
        ret.ok=true;
        ret.data=await res.json();
    } catch(err) {
        if(err instanceof DOMException && err.name === 'AbortError')
            ret.err=Status.RequestTimeout;
        else
            ret.err=Status.ServiceUnavailable;
    }
    return ret;
}
