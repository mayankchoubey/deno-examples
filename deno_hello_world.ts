import {serve} from "https://deno.land/std/http/mod.ts";

const handler=()=>new Response("Hello world!");
serve(handler, {port: 8000});
