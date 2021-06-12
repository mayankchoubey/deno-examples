import { encodeToString } from "https://deno.land/std/encoding/hex.ts";

const i=Uint8Array.from({length: 50}, () => Math.floor(Math.random() * 50));

new Uint8Array(await crypto.subtle.digest('sha-512', i));
//Uint8Array(64) [114, 18, 60, 52, 57, 109, 160, 248, 102, 239, 118, 250, 222, 76, 187, 139, 250, 239, 232, 179, 31, 144, 192, 174, 39,  73, 17, 211, 237, 236,  93, 143, 12, 33, 234, 172, 70, 22, 96, 110, 120, 151, 207, 228, 250, 96, 114, 88, 158, 63, 122, 120, 198, 210, 221, 118, 28, 19, 99, 162, 145, 236, 182, 184]

encodeToString(new Uint8Array(await crypto.subtle.digest('sha-512', i)));
//72123c34396da0f866ef76fade4cbb8bfaefe8b31f90c0ae274911d3edec5d8f0c21eaac4616606e7897cfe4fa6072589e3f7a78c6d2dd761c1363a291ecb6b8
