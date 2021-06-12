import { encodeToString } from "https://deno.land/std/encoding/hex.ts";//common input for all functions

const i=Uint8Array.from({length: 50}, () => Math.floor(Math.random() * 50));

console.log(new Uint8Array(await crypto.subtle.digest('sha-1', i)));
//Uint8Array(20) [87, 55, 240, 228, 250, 122, 3, 204, 85, 72, 125,  85, 159, 198, 81, 239, 35, 254, 77, 27]

console.log(encodeToString(new Uint8Array(await crypto.subtle.digest('sha-1', i))));
//df3ed451c9ea86ab10ff7583874ad1bd4813c3e0
