import { encodeToString } from "https://deno.land/std/encoding/hex.ts";

const i=Uint8Array.from({length: 50}, () => Math.floor(Math.random() * 50));

console.log(new Uint8Array(await crypto.subtle.digest('sha-256', i)));
//Uint8Array(32) [197, 138, 201, 31, 201, 218, 169, 117, 12, 31,  16, 116, 230, 169, 44, 154, 108, 120, 28, 123, 64, 183, 162, 129, 196, 82, 114, 116, 245, 211, 116, 122]

console.log(encodeToString(new Uint8Array(await crypto.subtle.digest('sha-256', i))));
//c58ac91fc9daa9750c1f1074e6a92c9a6c781c7b40b7a281c4527274f5d3747a
