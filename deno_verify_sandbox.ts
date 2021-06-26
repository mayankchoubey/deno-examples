const err=await verifySandbox();
if(err) {
    console.error(`Required accesses ${err} is not present, exiting`);
    Deno.exit(1);
}

async function verifySandbox(): Promise<string> {
    if((await Deno.permissions.query({name: 'read', path: '/var/tmp'})).state!=='granted')
        return '/var/tmp';
    if((await Deno.permissions.query({name: 'read', path: '/data'})).state!=='granted')
        return '/data';
    if((await Deno.permissions.query({name: 'write', path: '/var/log'})).state!=='granted')
        return '/var/log';
    if((await Deno.permissions.query({name: 'env', variable: 'MOUNT_LOCATION'})).state!=='granted')
        return 'MOUNT_LOCATION';
    if((await Deno.permissions.query({name: 'net', host: '0.0.0.0:5050'})).state!=='granted')
        return '0.0.0.0:5050';
    if((await Deno.permissions.query({name: 'net', host: 'readings-db.service.net:8080'})).state!=='granted')
        return 'readings-db.service.net:8080';
    return "";
}
