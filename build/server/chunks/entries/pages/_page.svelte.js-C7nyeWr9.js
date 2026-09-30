import { a as ensure_array_like, e as escape_html, b as attr, d as derived } from '../../chunks/root.js-BqL2_mtD.js';
import '../../chunks/exports.js-8HOoaa4e.js';
import '../../chunks/utils2.js-BQzn9ikS.js';
import '../../chunks/utils.js-CIEHXq9x.js';
import '../../chunks/state.svelte.js-DoXY8Pws.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { form } = $$props;
    let teamMonths = [];
    let primaryMonths = [];
    let months = derived(() => teamMonths.length && primaryMonths.length ? teamMonths.filter((m) => primaryMonths.includes(m)) : teamMonths.length ? teamMonths : primaryMonths);
    let noCommonMonth = derived(() => teamMonths.length > 0 && primaryMonths.length > 0 && months().length === 0);
    $$renderer2.push(`<main class="svelte-1uha8ag"><h1>Reconcile check</h1> <form method="POST" enctype="multipart/form-data" class="svelte-1uha8ag"><label class="svelte-1uha8ag">Team sheet <input type="file" name="team" accept=".csv" required=""/></label> <label class="svelte-1uha8ag">Primary <input type="file" name="primary" accept=".csv" required=""/></label> `);
    if (months().length) {
      $$renderer2.push(`<!--[0--><label class="svelte-1uha8ag">Month <select name="month" required=""><!--[-->`);
      const each_array = ensure_array_like(months());
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let m = each_array[$$index];
        $$renderer2.option({ value: m }, ($$renderer3) => {
          $$renderer3.push(`${escape_html(m)}`);
        });
      }
      $$renderer2.push(`<!--]--></select></label>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <button type="submit"${attr("disabled", noCommonMonth(), true)}>Check</button></form> `);
    if (noCommonMonth()) {
      $$renderer2.push(`<!--[1--><p class="error svelte-1uha8ag">No month appears in both files.</p>`);
    } else if (form?.error) {
      $$renderer2.push(`<!--[2--><p class="error svelte-1uha8ag">${escape_html(form.error)}</p>`);
    } else if (form?.lines) {
      $$renderer2.push(`<!--[3--><pre class="svelte-1uha8ag">${escape_html(form.lines.join("\n"))}</pre>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></main>`);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte.js-C7nyeWr9.js.map
