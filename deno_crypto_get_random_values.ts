const a=new Uint8Array(5), as=new Int8Array(5);

crypto.getRandomValues(a);
//Uint8Array(5) [ 247, 253, 246, 244, 113 ]

a.join("");
//247253246244113

crypto.getRandomValues(as);
//Int8Array(5) [ -109, 106, -30, 97, -82 ]

const b=new Uint16Array(5), bs=new Int16Array(5);

crypto.getRandomValues(b); 
//Uint16Array(5) [ 37648, 25274, 5837, 4397, 23974 ]

b.join(""); 
//308243249111236650121230670332937661885318486139938227383374112662963388624888536138937534001210687

crypto.getRandomValues(bs); 
//Int16Array(5) [ 28244, 11515, -14516, 14045, -8667 ]

const c=new Uint32Array(5), cs=new Int32Array(5);

crypto.getRandomValues(c); 
//Uint32Array(5) [ 1339403152, 473530254, 2553241448, 1133203190, 3603565761 ]

crypto.getRandomValues(cs); 
//Int32Array(5) [ -77009087, -208622314, 2107725964, -1779237119, 1434297744 ]const b=new Uint32Array(10);

