import { e as escape_html, g as getContext } from '../../chunks/root.js-BqL2_mtD.js';
import '../../chunks/state.svelte.js-DoXY8Pws.js';
import '../../chunks/exports.js-8HOoaa4e.js';
import '../../chunks/utils2.js-BQzn9ikS.js';
import '../../chunks/utils.js-CIEHXq9x.js';

function context() {
  return getContext("__request__");
}
const page$1 = {
  get error() {
    return context().page.error;
  },
  get status() {
    return context().page.status;
  }
};
const page = page$1;
function Error$1($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<h1>${escape_html(page.status)}</h1> <p>${escape_html(page.error?.message)}</p>`);
  });
}

export { Error$1 as default };
//# sourceMappingURL=error.svelte.js-Cp2O_WN4.js.map
