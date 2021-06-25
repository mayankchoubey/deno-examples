import { Status } from "https://deno.land/std/http/http_status.ts";

const redirect = (resp:any, target:string, status:number=Status.Found) =>
    resp(new Response(undefined, {status, headers: {'location': encodeURI(target)}}));

const serveLogin = (resp:any, body:string) => resp(new Response(body, {status: Status.OK}));

const listener = Deno.listen({ port: 5000 });
while(1) {
    const conn=await listener.accept();
    handleNewConnection(conn);
}

async function handleNewConnection(conn: Deno.Conn) {
    const httpConn=Deno.serveHttp(conn);
    for await(const {request, respondWith} of httpConn)
        (new URL(request.url)).pathname==='/' ?
            redirect(respondWith, '/login'): 
            serveLogin(respondWith, "Welcome to login page");
}
