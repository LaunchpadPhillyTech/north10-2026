import { n as noop } from './root.js-BqL2_mtD.js';
import './exports.js-8HOoaa4e.js';
import './utils.js-CIEHXq9x.js';

const is_legacy = noop.toString().includes("$$") || /function \w+\(\) \{\}/.test(noop.toString());
const placeholder_url = "a:";
if (is_legacy) {
  ({
    url: new URL(placeholder_url)
  });
}
//# sourceMappingURL=state.svelte.js-DoXY8Pws.js.map
