import { c as createComponent, a as createAstro, r as renderComponent, b as renderScript, d as renderTemplate, e as addAttribute, f as renderHead, g as renderSlot, m as maybeRenderHead, F as Fragment } from '../chunks/astro/server_CFe2sk0b.mjs';
/* empty css                                 */
import '../chunks/index_DKHmmOtR.mjs';
import { $ as $$Image } from '../chunks/_astro_assets_BrCiRPgL.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro$3 = createAstro();
const $$Index$1 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Index$1;
  const propsStr = JSON.stringify(Astro2.props);
  const paramsStr = JSON.stringify(Astro2.params);
  return renderTemplate`${renderComponent($$result, "vercel-analytics", "vercel-analytics", { "data-props": propsStr, "data-params": paramsStr, "data-pathname": Astro2.url.pathname })} ${renderScript($$result, "/Users/xyntechx/xyntechx/node_modules/.pnpm/@vercel+analytics@1.5.0/node_modules/@vercel/analytics/dist/astro/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/xyntechx/xyntechx/node_modules/.pnpm/@vercel+analytics@1.5.0/node_modules/@vercel/analytics/dist/astro/index.astro", void 0);

const $$Astro$2 = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Layout;
  return renderTemplate`<html lang="en" data-astro-cid-sckkx6r4> <head><meta charset="UTF-8"><meta name="description" content="AI researcher and government tech scholar interested in representation learning, embodied intelligence, and responsible AI"><meta name="viewport" content="width=device-width"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>Nyx Iskandar</title><meta name="author" content="Nyx Iskandar"><meta property="og:title" content="Nyx Iskandar"><meta property="og:description" content="AI researcher and government tech scholar interested in representation learning, embodied intelligence, and responsible AI"><meta property="og:image" content="https://xyntechx.com/xyntechx.png"><meta property="og:url" content="https://xyntechx.com/"><meta property="og:type" content="website">${renderComponent($$result, "Analytics", $$Index$1, { "data-astro-cid-sckkx6r4": true })}<link rel="icon" type="image/png" href="/favicons/favicon-96x96.png" sizes="96x96"><link rel="icon" type="image/svg+xml" href="/favicons/favicon.svg"><link rel="shortcut icon" href="/favicons/favicon.ico"><link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png"><link rel="manifest" href="/favicons/site.webmanifest"><meta name="theme-color" content="#ffffff">${renderHead()}</head> <body class="font-mono flex items-center justify-start flex-col w-screen min-h-screen tracking-tight selection:bg-amber-100" data-astro-cid-sckkx6r4> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "/Users/xyntechx/xyntechx/src/layouts/Layout.astro", void 0);

const $$Astro$1 = createAstro();
const $$Link = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Link;
  const { text, url } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(url, "href")} target="_blank" class="bg-amber-400 hover:bg-amber-500 transition-colors px-2 py-0.5 rounded-sm text-center">${text}</a>`;
}, "/Users/xyntechx/xyntechx/src/components/Link.astro", void 0);

const $$Astro = createAstro();
const $$Paper = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Paper;
  const { title, venue, authors, links } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="flex items-start justify-center flex-col text-sm gap-y-1"> <h3 class="font-bold">${title}</h3> <p class="text-gray-500">${venue}</p> <div class="flex items-center justify-start flex-row gap-x-2 text-gray-500 text-xs flex-wrap"> ${authors.map((a, i) => renderTemplate`<p${addAttribute(a.includes("Nyx") ? "font-bold" : "", "class")}>${a}</p>
            ${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${i !== authors.length - 1 && renderTemplate`<p>&#183;</p>`}` })}`)} </div> <div class="flex items-center justify-start flex-row gap-2"> ${links.map((l, i) => renderTemplate`${renderComponent($$result, "Link", $$Link, { "text": l.text, "url": l.url })}
            ${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${i !== links.length - 1 && renderTemplate`<p>&#183;</p>`}` })}`)} </div> </div>`;
}, "/Users/xyntechx/xyntechx/src/components/Paper.astro", void 0);

const nyxPP = new Proxy({"src":"/_astro/nyx.qLQLdWHx.jpg","width":2131,"height":2131,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/xyntechx/xyntechx/src/assets/nyx.jpg";
							}
							
							return target[name];
						}
					});

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="flex items-center justify-center flex-col gap-12 py-12 px-4 md:px-0 md:w-1/2 w-full"> <div class="w-full flex items-center justify-center flex-row gap-4"> <div class="w-[80px] h-[80px]"> ${renderComponent($$result2, "Image", $$Image, { "src": nyxPP, "alt": "Nyx Profile Picture", "class": "rounded-sm" })} </div> <div class="flex items-start justify-center flex-col flex-1 gap-2"> <h1 class="text-2xl font-bold">nyx iskandar</h1> <div class="flex items-center justify-center flex-row gap-4 text-sm"> ${renderComponent($$result2, "Link", $$Link, { "text": "git", "url": "https://github.com/xyntechx" })} <p>&#183;</p> ${renderComponent($$result2, "Link", $$Link, { "text": "orcid", "url": "https://orcid.org/0009-0008-4361-3364" })} <p>&#183;</p> ${renderComponent($$result2, "Link", $$Link, { "text": "in", "url": "https://www.linkedin.com/in/nyx-iskandar/" })} <p>&#183;</p> ${renderComponent($$result2, "Link", $$Link, { "text": "@", "url": "mailto:nyx@berkeley.edu" })} </div> </div> </div> <div class="w-full flex items-start justify-center flex-col border-y-2 py-4 px-1 text-sm"> <p>
electrical engineering & computer sciences (honors), <span class="font-bold">uc berkeley</span> </p> <p>
research, <span class="font-bold">berkeley ai research</span> + <span class="font-bold">center for human-compatible ai</span> </p> <p>undergraduate fellow, <span class="font-bold">openai</span></p> <div class="flex items-center justify-end flex-row gap-x-4 text-amber-500 w-full pt-2 flex-wrap"> <p>#rl</p> <p>#planning</p> <p>#llm</p> <p>#code-gen</p> <p>#abstract-reprs</p> <p>#robust-agents</p> </div> </div> <div class="w-full flex items-start justify-center flex-col gap-y-4"> <h1> <span class="font-bold">publications</span> <span class="text-gray-500 text-xs">(*=equal contribution)</span> </h1> ${renderComponent($$result2, "Paper", $$Paper, { "title": "A Matter of Representation: Towards Graph-Based Abstract Code Generation", "venue": "NeurIPS (DL4C workshop), 2025", "authors": ["Nyx Iskandar", "Hisham Bedri", "Andy Tsen"], "links": [{ text: "paper", url: "#" }] })} ${renderComponent($$result2, "Paper", $$Paper, { "title": "Measuring What Matters: A Framework for Evaluating Safety Risks in Real-World LLM Applications", "venue": "ICML (TAIG workshop), 2025 (spotlight)", "authors": [
    "Jia Yi Goh*",
    "Shaun Khoo*",
    "Nyx Iskandar*",
    "Gabriel Chua",
    "Leanne Tan",
    "Jessica Foo"
  ], "links": [
    {
      text: "paper",
      url: "https://doi.org/10.48550/arXiv.2507.09820"
    }
  ] })} ${renderComponent($$result2, "Paper", $$Paper, { "title": "Manga Layout Analysis via Deep Learning", "venue": "IRC-SET, 2022", "authors": ["Nyx Iskandar"], "links": [
    {
      text: "paper",
      url: "https://doi.org/10.1007/978-981-19-7222-5_6"
    },
    {
      text: "code",
      url: "https://github.com/xyntechx/Manga-Layout-Analysis"
    }
  ] })} </div> <div class="w-full flex items-start justify-center flex-col gap-y-4"> <h1 class="font-bold">mentors</h1> <div class="flex items-center justify-center flex-row gap-4 text-sm"> ${renderComponent($$result2, "Link", $$Link, { "text": "cam allen", "url": "https://camallen.net/" })} <p>&#183;</p> ${renderComponent($$result2, "Link", $$Link, { "text": "ritwik gupta", "url": "https://ritwikgupta.me/" })} <p>&#183;</p> ${renderComponent($$result2, "Link", $$Link, { "text": "tyna eloundou", "url": "https://eloundou.net/" })} </div> </div> </main> ` })}`;
}, "/Users/xyntechx/xyntechx/src/pages/index.astro", void 0);

const $$file = "/Users/xyntechx/xyntechx/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
