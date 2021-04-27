console.log("Connecting to server ...");
let ws:WebSocket;
try {
    ws=new WebSocket('ws://localhost:5000');
} catch(err) {
    console.log('Failed to connect to server ... exiting');
    Deno.exit(1);
}
ws.onopen=connected;
ws.onmessage=m=>processMessage(ws, m);
ws.onclose=()=>console.log('Disconnected from server ...');

function connected() {
    console.log('Connected to server ...');
}

function processMessage(ws:WebSocket, m:MessageEvent) {
    console.log('SERVER >> '+m.data);
    const reply=prompt('Client >> ') || 'No reply';
    if(reply === 'exit')
        return ws.close();
    ws.send(reply as string);
}