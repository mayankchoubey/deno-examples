import { encodeToString } from "https://deno.land/std/encoding/hex.ts";

const i=Uint8Array.from({length: 50}, () => Math.floor(Math.random() * 50));

console.log(new Uint8Array(await crypto.subtle.digest('sha-384', i)));
//Uint8Array(48) [72, 183, 141, 243, 202, 146, 234, 12, 199, 105, 108, 145, 37, 170,  47, 121, 203, 166, 4, 170, 33, 1, 13, 33, 23, 243, 148, 58, 137, 107, 243, 74, 127, 49, 200, 62, 30,  62,  54,  63, 167, 251, 139, 102, 120, 17, 3, 7]

console.log(encodeToString(new Uint8Array(await crypto.subtle.digest('sha-384', i))));
//48b78df3ca92ea0cc7696c9125aa2f79cba604aa21010d2117f3943a896bf34a7f31c83e1e3e363fa7fb8b6678110307
