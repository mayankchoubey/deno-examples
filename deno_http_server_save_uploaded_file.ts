import { readerFromStreamReader } from "https://deno.land/std/io/streams.ts";const SAVE_PATH="./";const listener = Deno.listen({ port: 5000 });

for await(const conn of listener)
    handleNewConnection(conn); 
        
async function handleNewConnection(conn: Deno.Conn) {
    for await(const { request, respondWith } of Deno.serveHttp(conn)) {
        const url=new URL(request.url);
        let fileName="";
        for(const p of url.searchParams)
            if(p[0]==='filename')
                fileName=p[1];
        if(!fileName)
            fileName=crypto.randomUUID();
        const sr=request?.body?.getReader();
        if(sr) {
            const f=await Deno.open(SAVE_PATH+fileName, {create: true, write: true});
            await Deno.copy(readerFromStreamReader(sr), f);
            await f.close();
        }
        respondWith(new Response());
    }
    
}
