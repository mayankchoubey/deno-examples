import {exists} from "https://deno.land/std/fs/mod.ts";
import {readableStreamFromReader as toStream} from "https://deno.land/std/io/mod.ts";

const port=5000, contentDir='/var/tmp';

const listener = Deno.listen({port});
for await(const conn of listener)
    handleNewConnection(conn);
    
async function handleNewConnection(conn: Deno.Conn) {
    for await(const req of Deno.serveHttp(conn))
        await handleRequest(req.request, req.respondWith);
}

async function handleRequest(req:Request, resp:any) {
    const fileName=new URL(req.url).searchParams.get('filename');
    if(!fileName)
        return resp(new Response(undefined, {status: 400}));
    const filePath=`${contentDir}/${fileName}`;
    if(!await exists(filePath))
        return resp(new Response(undefined, {status: 404}));
    const fileSize=(await Deno.stat(filePath)).size;
    const r=await Deno.open(filePath);
    resp(new Response(toStream(r), {
        headers: new Headers({'content-length': fileSize.toString()})
    }));
    await r.close();
}
