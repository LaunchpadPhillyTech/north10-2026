

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.C42Gk-fZ.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/BSI11T0U.js","_app/immutable/chunks/CaIzG67u.js"];
export const stylesheets = [];
export const fonts = [];
