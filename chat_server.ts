import * as ws from "https://deno.land/std/ws/mod.ts";
import { serve } from "https://deno.land/std/http/mod.ts";

const db:Record<string, string>={
    'help': 'Sure, I am here to help. Can you briefly describe the problem.',
    'hi': 'Hi, how can I help you today?',
    'hello': 'Hi, how can I help you today?',
    'unknown': 'Sorry, I am unable to understand you.'
};

console.log('Waiting for clients ...');
for await(const req of serve(':5000')) {
    console.log('Incoming connection from client ...');
    const wdata={conn: req.conn, bufReader: req.r, bufWriter: req.w, headers: req.headers};
    try {
        const whdl=await ws.acceptWebSocket(wdata);
        console.log('Connection established with client ...');
        whdl.send(db['hi']);
        console.log('SERVER >> '+db['hi']);
        for await (const e of whdl) {
            if(ws.isWebSocketCloseEvent(e)) {
                console.log('Connection closed by client ...');
                break;
            }
            else if(typeof e === 'string') {
                console.log('CLIENT >> '+e);
                let message:string="";
                for(const k in db)  
                    if(e.includes(k))
                        message=db[k];
                if(!message)
                    message=db['unknown'];
                whdl.send(message);
                console.log('SERVER >> '+message);
            }
        }

    } catch(err) {
        req.respond({status: 400});
    }
}