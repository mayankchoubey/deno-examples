const listener = Deno.listen({ port: 5000 });
for await(const conn of listener)
    handleNewConnection(conn); 
        
async function handleNewConnection(conn: Deno.Conn) {
    for await(const { request, respondWith } of Deno.serveHttp(conn)) {
        const url=new URL(request.url);
        let fileName="";
        for(const p of url.searchParams)
            if(p[0]==='filename')
                fileName=p[1];
        let proxyUrl='http://localhost:3000/';
        if(fileName)
            proxyUrl+='?filename='+fileName;
        const pRsp=await fetch(proxyUrl, {method: 'POST', body: request.body});
        const pResJson=await pRsp.json();
        respondWith(new Response());
    }
}
