import { serve } from "https://deno.land/std/http/mod.ts";

async function reqHandler(req: Request) {
  return new Response(req.body, {
    headers: req.headers,
  });
}

serve(reqHandler, { port: 8000 });
