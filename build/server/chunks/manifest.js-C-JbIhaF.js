const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([]),
	mimeTypes: {},
	_: {
		client: {start:"_app/immutable/entry/start.Blhw_J9_.js",app:"_app/immutable/entry/app.wjJxOArj.js",imports:["_app/immutable/entry/start.Blhw_J9_.js","_app/immutable/chunks/CGkSwjLF.js","_app/immutable/chunks/DgMlaKUs.js","_app/immutable/chunks/BSI11T0U.js","_app/immutable/chunks/CSfeGaBS.js","_app/immutable/entry/app.wjJxOArj.js","_app/immutable/chunks/BSI11T0U.js","_app/immutable/chunks/DgMlaKUs.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/B1WYbV0y.js","_app/immutable/chunks/CaIzG67u.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js-dd8MRUOR.js')),
			__memo(() => import('./nodes/1.js-CMf0ygVT.js')),
			__memo(() => import('./nodes/2.js-Dvf5kaQa.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

export { manifest as m };
//# sourceMappingURL=manifest.js-C-JbIhaF.js.map
