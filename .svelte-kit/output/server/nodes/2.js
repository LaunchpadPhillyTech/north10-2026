import * as server from '../entries/pages/_page.server.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.ts";
export const imports = ["_app/immutable/nodes/2.CQ64s6eY.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/BSI11T0U.js","_app/immutable/chunks/DgMlaKUs.js","_app/immutable/chunks/B1WYbV0y.js","_app/immutable/chunks/CaIzG67u.js","_app/immutable/chunks/CSfeGaBS.js","_app/immutable/chunks/CGkSwjLF.js"];
export const stylesheets = ["_app/immutable/assets/2.DdEJTI5J.css"];
export const fonts = [];
