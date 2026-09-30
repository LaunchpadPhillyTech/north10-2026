
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * This module provides access to environment variables that are injected _statically_ into your bundle at build time and are limited to _private_ access.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Static environment variables are [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env` at build time and then statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * **_Private_ access:**
 * 
 * - This module cannot be imported into client-side code
 * - This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured)
 * 
 * For example, given the following build time environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://site.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { ENVIRONMENT, PUBLIC_BASE_URL } from '$env/static/private';
 * 
 * console.log(ENVIRONMENT); // => "production"
 * console.log(PUBLIC_BASE_URL); // => throws error during build
 * ```
 * 
 * The above values will be the same _even if_ different values for `ENVIRONMENT` or `PUBLIC_BASE_URL` are set at runtime, as they are statically replaced in your code with their build time values.
 */
declare module '$env/static/private' {
	export const SVELTEKIT_FORK: string;
	export const EDITOR: string;
	export const MEMORY_PRESSURE_WRITE: string;
	export const npm_command: string;
	export const SNAP: string;
	export const SNAP_EUID: string;
	export const XDG_DATA_DIRS: string;
	export const VSCODE_CODE_CACHE_PATH: string;
	export const SNAP_REAL_HOME: string;
	export const XDG_CONFIG_DIRS: string;
	export const GPG_AGENT_INFO: string;
	export const DBUS_SESSION_BUS_ADDRESS: string;
	export const VSCODE_CRASH_REPORTER_PROCESS_TYPE: string;
	export const ELECTRON_RUN_AS_NODE: string;
	export const COLOR: string;
	export const GIO_LAUNCHED_DESKTOP_FILE_PID: string;
	export const MANAGERPID: string;
	export const DEBUGINFOD_URLS: string;
	export const NIX_PROFILES: string;
	export const CLAUDE_CODE_MESSAGING_SOCKET: string;
	export const SNAP_LAUNCHER_ARCH_TRIPLET: string;
	export const CLAUDE_CODE_CHILD_SESSION: string;
	export const GIO_LAUNCHED_DESKTOP_FILE: string;
	export const GTK_MODULES: string;
	export const GTK_IM_MODULE_FILE: string;
	export const VSCODE_CLI: string;
	export const APPLICATION_INSIGHTS_NO_STATSBEAT: string;
	export const NVM_DIR: string;
	export const GNOME_SHELL_SESSION_MODE: string;
	export const SNAP_LIBRARY_PATH: string;
	export const GIO_MODULE_DIR: string;
	export const NVM_BIN: string;
	export const XMODIFIERS: string;
	export const SYSTEMD_EXEC_PID: string;
	export const VSCODE_NLS_CONFIG: string;
	export const PATH: string;
	export const npm_config_noproxy: string;
	export const SNAP_REVISION: string;
	export const GDK_BACKEND: string;
	export const SNAP_COMMON: string;
	export const ELECTRON_NO_ATTACH_CONSOLE: string;
	export const VSCODE_HANDLES_UNCAUGHT_ERRORS: string;
	export const NVM_INC: string;
	export const USER: string;
	export const SNAP_USER_DATA: string;
	export const VSCODE_CWD: string;
	export const CLAUDE_CODE_ENTRYPOINT: string;
	export const INIT_CWD: string;
	export const GJS_DEBUG_TOPICS: string;
	export const PWD: string;
	export const VSCODE_ESM_ENTRYPOINT: string;
	export const LESSOPEN: string;
	export const GIT_EDITOR: string;
	export const FONTCONFIG_PATH: string;
	export const XDG_RUNTIME_DIR: string;
	export const SNAP_NAME: string;
	export const GJS_DEBUG_OUTPUT: string;
	export const npm_config_user_agent: string;
	export const COPILOT_OTEL_FILE_EXPORTER_PATH: string;
	export const SNAP_UID: string;
	export const XDG_DATA_DIRS_VSCODE_SNAP_ORIG: string;
	export const AI_AGENT: string;
	export const JOURNAL_STREAM: string;
	export const NODE_ENV: string;
	export const WINDOWPATH: string;
	export const npm_config_userconfig: string;
	export const XDG_SESSION_TYPE: string;
	export const SHLVL: string;
	export const npm_node_execpath: string;
	export const VSCODE_L10N_BUNDLE_LOCATION: string;
	export const CLUTTER_DISABLE_MIPMAPPED_TEXT: string;
	export const CLAUDE_CODE_MESSAGING_TOKEN: string;
	export const SNAP_INSTANCE_NAME: string;
	export const VSCODE_IPC_HOOK: string;
	export const DISPLAY: string;
	export const __ETC_PROFILE_NIX_SOURCED: string;
	export const XDG_CURRENT_DESKTOP: string;
	export const MXC_BIN_DIR: string;
	export const SNAP_CONTEXT: string;
	export const HOME: string;
	export const CLAUDE_CODE_ENABLE_TASKS: string;
	export const npm_config_global_prefix: string;
	export const CHROME_DESKTOP: string;
	export const GSM_SKIP_SSH_AGENT_WORKAROUND: string;
	export const GTK_PATH: string;
	export const DESKTOP_SESSION: string;
	export const npm_config_prefix: string;
	export const GDK_PIXBUF_MODULEDIR: string;
	export const CLAUDE_CODE_ENABLE_SDK_FILE_CHECKPOINTING: string;
	export const XAUTHORITY: string;
	export const npm_config_npm_version: string;
	export const LOCPATH: string;
	export const CLAUDE_AGENT_SDK_VERSION: string;
	export const XDG_CONFIG_DIRS_VSCODE_SNAP_ORIG: string;
	export const XDG_SESSION_CLASS: string;
	export const CLAUDE_CODE_EMIT_STARTUP_TIMING: string;
	export const USERNAME: string;
	export const GNOME_DESKTOP_SESSION_ID: string;
	export const FC_FONTATIONS: string;
	export const CLAUDE_CODE_SESSION_ATTENDED: string;
	export const MCP_CONNECTION_NONBLOCKING: string;
	export const npm_config_node_gyp: string;
	export const LOGNAME: string;
	export const MEMORY_PRESSURE_WATCH: string;
	export const SHELL: string;
	export const SESSION_MANAGER: string;
	export const _: string;
	export const NIX_SSL_CERT_FILE: string;
	export const INVOCATION_ID: string;
	export const npm_config_cache: string;
	export const NODE: string;
	export const npm_config_local_prefix: string;
	export const npm_package_name: string;
	export const XDG_MENU_PREFIX: string;
	export const COPILOT_CLI_ENABLED_FEATURE_FLAGS: string;
	export const SNAP_VERSION: string;
	export const COREPACK_ENABLE_AUTO_PIN: string;
	export const SNAP_COOKIE: string;
	export const SNAP_DATA: string;
	export const GSETTINGS_SCHEMA_DIR: string;
	export const CLAUDE_EFFORT: string;
	export const CLAUDE_PID: string;
	export const NoDefaultCurrentDirectoryInExePath: string;
	export const LANG: string;
	export const XDG_SESSION_DESKTOP: string;
	export const GTK_EXE_PREFIX: string;
	export const npm_lifecycle_script: string;
	export const npm_package_json: string;
	export const SNAP_USER_COMMON: string;
	export const CLAUDE_CODE_EXECPATH: string;
	export const SSH_AUTH_SOCK: string;
	export const FONTCONFIG_FILE: string;
	export const SNAP_ARCH: string;
	export const npm_package_version: string;
	export const npm_lifecycle_event: string;
	export const QT_ACCESSIBILITY: string;
	export const npm_config_init_module: string;
	export const GDMSESSION: string;
	export const CLAUDE_CODE_SESSION_ID: string;
	export const LESSCLOSE: string;
	export const CLAUDECODE: string;
	export const GDK_PIXBUF_MODULE_FILE: string;
	export const QT_IM_MODULE: string;
	export const VSCODE_PID: string;
	export const npm_config_globalconfig: string;
	export const npm_execpath: string;
}

/**
 * This module provides access to environment variables that are injected _statically_ into your bundle at build time and are _publicly_ accessible.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Static environment variables are [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env` at build time and then statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * **_Public_ access:**
 * 
 * - This module _can_ be imported into client-side code
 * - **Only** variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`) are included
 * 
 * For example, given the following build time environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://site.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { ENVIRONMENT, PUBLIC_BASE_URL } from '$env/static/public';
 * 
 * console.log(ENVIRONMENT); // => throws error during build
 * console.log(PUBLIC_BASE_URL); // => "http://site.com"
 * ```
 * 
 * The above values will be the same _even if_ different values for `ENVIRONMENT` or `PUBLIC_BASE_URL` are set at runtime, as they are statically replaced in your code with their build time values.
 */
declare module '$env/static/public' {
	
}

/**
 * This module provides access to environment variables set _dynamically_ at runtime and that are limited to _private_ access.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Dynamic environment variables are defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://svelte.dev/docs/kit/cli)), this is equivalent to `process.env`.
 * 
 * **_Private_ access:**
 * 
 * - This module cannot be imported into client-side code
 * - This module includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured)
 * 
 * > [!NOTE] In `dev`, `$env/dynamic` includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 * 
 * > [!NOTE] To get correct types, environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * >
 * > ```env
 * > MY_FEATURE_FLAG=
 * > ```
 * >
 * > You can override `.env` values from the command line like so:
 * >
 * > ```sh
 * > MY_FEATURE_FLAG="enabled" npm run dev
 * > ```
 * 
 * For example, given the following runtime environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://site.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * 
 * console.log(env.ENVIRONMENT); // => "production"
 * console.log(env.PUBLIC_BASE_URL); // => undefined
 * ```
 */
declare module '$env/dynamic/private' {
	export const env: {
		SVELTEKIT_FORK: string;
		EDITOR: string;
		MEMORY_PRESSURE_WRITE: string;
		npm_command: string;
		SNAP: string;
		SNAP_EUID: string;
		XDG_DATA_DIRS: string;
		VSCODE_CODE_CACHE_PATH: string;
		SNAP_REAL_HOME: string;
		XDG_CONFIG_DIRS: string;
		GPG_AGENT_INFO: string;
		DBUS_SESSION_BUS_ADDRESS: string;
		VSCODE_CRASH_REPORTER_PROCESS_TYPE: string;
		ELECTRON_RUN_AS_NODE: string;
		COLOR: string;
		GIO_LAUNCHED_DESKTOP_FILE_PID: string;
		MANAGERPID: string;
		DEBUGINFOD_URLS: string;
		NIX_PROFILES: string;
		CLAUDE_CODE_MESSAGING_SOCKET: string;
		SNAP_LAUNCHER_ARCH_TRIPLET: string;
		CLAUDE_CODE_CHILD_SESSION: string;
		GIO_LAUNCHED_DESKTOP_FILE: string;
		GTK_MODULES: string;
		GTK_IM_MODULE_FILE: string;
		VSCODE_CLI: string;
		APPLICATION_INSIGHTS_NO_STATSBEAT: string;
		NVM_DIR: string;
		GNOME_SHELL_SESSION_MODE: string;
		SNAP_LIBRARY_PATH: string;
		GIO_MODULE_DIR: string;
		NVM_BIN: string;
		XMODIFIERS: string;
		SYSTEMD_EXEC_PID: string;
		VSCODE_NLS_CONFIG: string;
		PATH: string;
		npm_config_noproxy: string;
		SNAP_REVISION: string;
		GDK_BACKEND: string;
		SNAP_COMMON: string;
		ELECTRON_NO_ATTACH_CONSOLE: string;
		VSCODE_HANDLES_UNCAUGHT_ERRORS: string;
		NVM_INC: string;
		USER: string;
		SNAP_USER_DATA: string;
		VSCODE_CWD: string;
		CLAUDE_CODE_ENTRYPOINT: string;
		INIT_CWD: string;
		GJS_DEBUG_TOPICS: string;
		PWD: string;
		VSCODE_ESM_ENTRYPOINT: string;
		LESSOPEN: string;
		GIT_EDITOR: string;
		FONTCONFIG_PATH: string;
		XDG_RUNTIME_DIR: string;
		SNAP_NAME: string;
		GJS_DEBUG_OUTPUT: string;
		npm_config_user_agent: string;
		COPILOT_OTEL_FILE_EXPORTER_PATH: string;
		SNAP_UID: string;
		XDG_DATA_DIRS_VSCODE_SNAP_ORIG: string;
		AI_AGENT: string;
		JOURNAL_STREAM: string;
		NODE_ENV: string;
		WINDOWPATH: string;
		npm_config_userconfig: string;
		XDG_SESSION_TYPE: string;
		SHLVL: string;
		npm_node_execpath: string;
		VSCODE_L10N_BUNDLE_LOCATION: string;
		CLUTTER_DISABLE_MIPMAPPED_TEXT: string;
		CLAUDE_CODE_MESSAGING_TOKEN: string;
		SNAP_INSTANCE_NAME: string;
		VSCODE_IPC_HOOK: string;
		DISPLAY: string;
		__ETC_PROFILE_NIX_SOURCED: string;
		XDG_CURRENT_DESKTOP: string;
		MXC_BIN_DIR: string;
		SNAP_CONTEXT: string;
		HOME: string;
		CLAUDE_CODE_ENABLE_TASKS: string;
		npm_config_global_prefix: string;
		CHROME_DESKTOP: string;
		GSM_SKIP_SSH_AGENT_WORKAROUND: string;
		GTK_PATH: string;
		DESKTOP_SESSION: string;
		npm_config_prefix: string;
		GDK_PIXBUF_MODULEDIR: string;
		CLAUDE_CODE_ENABLE_SDK_FILE_CHECKPOINTING: string;
		XAUTHORITY: string;
		npm_config_npm_version: string;
		LOCPATH: string;
		CLAUDE_AGENT_SDK_VERSION: string;
		XDG_CONFIG_DIRS_VSCODE_SNAP_ORIG: string;
		XDG_SESSION_CLASS: string;
		CLAUDE_CODE_EMIT_STARTUP_TIMING: string;
		USERNAME: string;
		GNOME_DESKTOP_SESSION_ID: string;
		FC_FONTATIONS: string;
		CLAUDE_CODE_SESSION_ATTENDED: string;
		MCP_CONNECTION_NONBLOCKING: string;
		npm_config_node_gyp: string;
		LOGNAME: string;
		MEMORY_PRESSURE_WATCH: string;
		SHELL: string;
		SESSION_MANAGER: string;
		_: string;
		NIX_SSL_CERT_FILE: string;
		INVOCATION_ID: string;
		npm_config_cache: string;
		NODE: string;
		npm_config_local_prefix: string;
		npm_package_name: string;
		XDG_MENU_PREFIX: string;
		COPILOT_CLI_ENABLED_FEATURE_FLAGS: string;
		SNAP_VERSION: string;
		COREPACK_ENABLE_AUTO_PIN: string;
		SNAP_COOKIE: string;
		SNAP_DATA: string;
		GSETTINGS_SCHEMA_DIR: string;
		CLAUDE_EFFORT: string;
		CLAUDE_PID: string;
		NoDefaultCurrentDirectoryInExePath: string;
		LANG: string;
		XDG_SESSION_DESKTOP: string;
		GTK_EXE_PREFIX: string;
		npm_lifecycle_script: string;
		npm_package_json: string;
		SNAP_USER_COMMON: string;
		CLAUDE_CODE_EXECPATH: string;
		SSH_AUTH_SOCK: string;
		FONTCONFIG_FILE: string;
		SNAP_ARCH: string;
		npm_package_version: string;
		npm_lifecycle_event: string;
		QT_ACCESSIBILITY: string;
		npm_config_init_module: string;
		GDMSESSION: string;
		CLAUDE_CODE_SESSION_ID: string;
		LESSCLOSE: string;
		CLAUDECODE: string;
		GDK_PIXBUF_MODULE_FILE: string;
		QT_IM_MODULE: string;
		VSCODE_PID: string;
		npm_config_globalconfig: string;
		npm_execpath: string;
		[key: `PUBLIC_${string}`]: undefined;
		[key: `${string}`]: string | undefined;
	}
}

/**
 * This module provides access to environment variables set _dynamically_ at runtime and that are _publicly_ accessible.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Dynamic environment variables are defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://svelte.dev/docs/kit/cli)), this is equivalent to `process.env`.
 * 
 * **_Public_ access:**
 * 
 * - This module _can_ be imported into client-side code
 * - **Only** variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`) are included
 * 
 * > [!NOTE] In `dev`, `$env/dynamic` includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 * 
 * > [!NOTE] To get correct types, environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * >
 * > ```env
 * > MY_FEATURE_FLAG=
 * > ```
 * >
 * > You can override `.env` values from the command line like so:
 * >
 * > ```sh
 * > MY_FEATURE_FLAG="enabled" npm run dev
 * > ```
 * 
 * For example, given the following runtime environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://example.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.ENVIRONMENT); // => undefined, not public
 * console.log(env.PUBLIC_BASE_URL); // => "http://example.com"
 * ```
 * 
 * ```
 * 
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		[key: `PUBLIC_${string}`]: string | undefined;
	}
}
