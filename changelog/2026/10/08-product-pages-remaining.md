# Product pages — remaining bands

- **Date:** 2026-10-08
- **Status:** planned. The atividades band, the shared spacing contract, and `/main.css` as a real stylesheet stay as they are.
- **Scope:** every product band on `/100-desafios/` and `/grammaire-chouette-a1/` that is not the lavender atividades band. Shared components are specified once. The grammar page section lists only the instance values that differ, including the lavender pitch that page still lacks.
- **Pages:** http://chouette.localhost:8080/100-desafios/ and http://chouette.localhost:8080/grammaire-chouette-a1/
- **Sources:** https://chouettefrances.hotmart.host/100-desafios and https://chouettefrances.hotmart.host/grammaire-chouette-a1

Read `changelog/2026/10/08-100-desafios-atividades.md` before editing. Its revalidated section is the spacing baseline. This plan does not reopen that band, the stylesheet delivery fix, or the deferred Eleventy cleanup table in that file.

## What is already on the page

Both routes already contain the same sequence of regions: hero, blue “sobre” split, blue buy row, lavender pitch, white school split, blue buy/support row, white shield split, blue price, FAQ. Copy, buy URLs, and the landing WebPs stay. What does not match the Hotmart pages, in the way the atividades band was adapted, is the composition:

| Region | Hotmart | Local now |
| --- | --- | --- |
| Hero | Copy on the left, cover on the right, cap 480px, no fixed height. Title 41px / 24px under 834px, blue. Lede 25px. Intro 16px. Green button. Orange chevron. | `.ProductHero-grid` becomes two columns at `48em` and opens the gap to `--space-l`. The cover is capped with `max-height: 24rem`. The chevron is `--red`. |
| Sobre | Image on the left, cap 349px. White heading 32px / 24px. White body 16px / 14px. One blue, `#024282`. | `.ProductSplit` at `48em`. Heading is an ordinary product `h2`. |
| First buy row | Green button beside the product name, centered, on blue. | `.ProductCtaRow`. This one already says the product name. |
| Lavender pitch | Both pages: red title 41px / 32px, blue bold body 18px / 16px, cover on the left. Desafios cover cap 366px. Grammar cover cap 409px. | Desafios is the finished Sidebar. Grammar is still `.ProductSplit` with a dark weight-400 heading. |
| School | Copy on the left, photo on the right, photo cap 480px. Blue heading 32px / 22px. Dark body 16px / 14px. | `.ProductSplit--reverse`. |
| Second buy row | Same component as the first buy row: button plus the product name. | The support lines sit in this row instead of the product name. |
| Support | White band. Screenshot on the left, cap 300px, then the two short lines and the guarantee sentence. | Those sentences are in the blue row above. The screenshot is not in `src/static/img/landing/`. |
| Offer | One blue centered stack: shield icon cap 100px, the “acesse” sentence, rule, optional struck price, `R$` amount at 88px / 48px, button, security line. The struck “49” is partly red. | The shield and the sentence are a white split. The price is a separate blue band. The shield files are `100-desafios-device.webp` and `grammaire-a1-device.webp`, both 273×332. |
| FAQ | Centered column, heading 32px, items 16px, orange marker. | `details` / `summary`, no marker, full band width. Spacing already measured. |

Hotmart repeats each region for desktop, tablet, and mobile, and stacks or centers under 834px. This plan does not copy that. The wrap of a Sidebar, Cluster, or Center is the narrow layout. There is no new `@media`.

## Rules carried from the atividades band

1. **Global, then primitive, then specific.** Globals stay in `src/routes/main.css`: Utopia type and space, `--red`, `--orange`, `--blue`, `--line-length`, `img { max-width: 100% }`. Do not change global `h2` or `p`.
2. **Primitives** are algorithms in `main.css`, next to `.stack` and `.with-sidebar`. No new custom element for a layout. Product paint stays in `src/components/product-landing.webc`.
3. **One owner per gap**, from the spacing contract. Prose flow is `--space-s` on a Stack. Media beside copy is `--space-m` on `--gutter`. A buy row’s own gap is `--space-s`. The two short support lines are `--space-2xs`. The guarantee sentence under them is `--space-m`, from one margin. Band padding stays on `.ProductBand`.
4. **Fonts.** Raleway and Quattrocento Sans stay. Hotmart uses Montserrat, and the “sobre” heading also names Bebas Neue. Do not add either.
5. **Copy** in the route files stays, including sentence case. Hotmart uppercases “SOBRE O DESAFIO” and “SOBRE A GRAMÁTICA”. Product headings already have `text-transform` left off. Do not put it back.
6. **Images.** Reuse the files under `src/static/img/landing/`. Keep `eleventy:ignore`. Do not hotlink `static-media.hotmart.com`. `width` and `height` are the file’s pixels. Every image below the hero keeps `loading="lazy"` and `decoding="async"`. The hero cover stays `loading="eager"`. The cold-load budget is 300 kB, measured as specified in the checks: every request of the load, not a subtotal of the document, `/main.css`, and the hero.
7. **Colors.** Bands keep `#fff`, `#024282`, and `#d1bedd`. Hotmart’s “sobre” band switches to `#05234A` under 834px. One blue is enough. School-heading blue on the model is `rgb(2, 65, 132)`. The product pages already use `#024282`. Use that.
8. **The atividades band is the regression check.** A primitive added for a right-hand image must leave that band’s computed layout on the 2026-10-08 numbers.

## Type steps

Root font is 19px at 320px and 22px at 1240px. That is `html { font-size: var(--size-0) }`. On the root element, `rem` is the initial 16px, so the root token lands on 19px and 22px.

A descendant that sets `font-size: var(--size-*)` resolves `rem` against that computed root, not against 16px, and not by multiplying the root by the Utopia scale ratio. The compiled clamps are in `docs/main.css`. Used sizes below are those clamps at the two viewports. Inheriting the root is a different number from setting `var(--size-0)` on the descendant: the explicit token is about 22.6px at 320px and 28.7px at 1240px.

| Role | Hotmart | What it uses | At 320px | At 1240px |
| --- | --- | --- | --- | --- |
| Hero title, lavender titles | 24px / 41px, lavender titles 32px / 41px | `--size-2`, already on `.ProductPage h1` and `.u-size-2` | 32.5px | 43.7px |
| Sobre, school, buy-row label, FAQ heading, support line, price label, struck price | about 22–24px narrow, about 31–32px wide for the headings; the price label is 24px | explicit `font-size: var(--size-0)` on that element | 22.6px | 28.7px |
| Hero lede | 24px / 25px | keep `.ProductHero-lede`’s `font-size: var(--size-0)` | 22.6px | 28.7px |
| Body, hero intro, “acesse” sentence, FAQ questions and answers | 14–18px | inherited root. No `font-size` declaration | 19px | 22px |
| Price amount | 48px / 88px | `--size-5` | 56.1px | 82.3px |
| Security line | 10px / 12px | `--size--3`, replacing the note’s `--size--2` | 13.1px | 15.4px |

`--size-1` is 27.1px and 35.4px. That is about 3px over the narrow heading reference and about 3px over 32px at 1240px, and it is 10px over the lede’s 25px. It is not the step for these roles. Do not add `.u-size-1`.

Explicit `--size-0` is the heading step. It meets the narrow 22–24px reference and sits about 3px under 32px at 1240px. `--size-2` at 43.7px is about 12px over that 32px reference. Lavender titles stay on `--size-2`: 32.5px meets their 32px narrow size and 43.7px is about 3px over 41px.

The lede already sets the explicit `--size-0` token. Keep that declaration. Removing it would inherit 19px / 22px, which is farther from 24px / 25px. Switching it to `--size-1` would be 35.4px at 1240px.

`--size-4` is 46.8px and 66.6px. It meets the narrow price (47px against 48px) and runs about 21px under 88px. `--size-5` is 8px over 48px and 6px under 88px, which is the nearer amount. An `88px` font-size is not a step. `.u-size-5 { font-size: var(--size-5); }` is the amount. Remove `font-size: clamp(2rem, 5vw, 3rem)` from `.ProductPriceBlock-now`. That clamp is `(0, 1, 0)`, the same as the utility, and product CSS can follow `main.css`.

Body stays on the inherited root, the same departure as the atividades paragraphs. `.ProductHero-intro` currently sets `font-size: var(--size--1)`, which is about 18.8px and 23.3px, not the inherited root. Remove that declaration. Keep `max-width: 40ch` and `line-height: 1.5`. `.ProductFaq summary` sets `font-size: var(--size--1)` as well. Remove it so the question inherits the root too.

The security note’s `--size--2` is 15.7px and 18.9px, farther from 10px / 12px than `--size--3`. Change `.ProductPriceBlock-note` to `font-size: var(--size--3)`. One declaration on the class. No utility beside it.

The hero title stays `--size-2` through `.ProductPage h1`. That meets the wide 41px and is about 8px over the 24px narrow size. Do not add a query to force 24px. `.u-size-0 { font-size: var(--size-0); }` is the explicit descendant token for the headings and the buy-row label. It is not inheritance.

## Primitives

### Sidebar, right-hand image

`.with-sidebar` still treats the first child as the intrinsic piece. The atividades cover is that first child and has no extra class. Hero and school put the image on the right and the heading first in the DOM.

`:first-child` is one class and one pseudo-class, `(0, 2, 0)`. `:last-child` is the same. A right-hand image needs a later rule that wins when it is the last child, and a reset so the first child is no longer treated as the intrinsic piece.

```css
.with-sidebar > .with-sidebar-pane {
	flex-basis: var(--sidebar-target);
	flex-grow: 1;
	min-inline-size: 0;
}
.with-sidebar:has(.with-sidebar-pane) > :first-child:not(.with-sidebar-pane) {
	flex-basis: 0;
	flex-grow: 999;
	min-inline-size: 50%;
}
```

`.with-sidebar > .with-sidebar-pane` is `(0, 2, 0)`, the same as `:last-child`. It has to follow the `:last-child` rule in `main.css` or the image keeps the content role. The `:has()` rule is two classes, `:has(.with-sidebar-pane)` at `(0, 1, 0)`, `:first-child` at `(0, 1, 0)`, and `:not(.with-sidebar-pane)` at `(0, 1, 0)`: `(0, 4, 0)`. It only resets a first child that is not the pane. The atividades cover is a first child without the class, so `:has()` does not match and that band does not change.

`flex-direction: row-reverse` is not used. It wraps the image to the inline end.

### Cap, without the cover radius

`.u-limit-target` caps to `--sidebar-target` and sets `border-radius: 1rem`. That radius belongs to the lavender covers (Hotmart’s 16px, our `1rem`). Hero, sobre, school, and the shield do not take it.

```css
.u-cap {
	max-inline-size: min(100%, var(--sidebar-target));
	block-size: auto;
}
```

Lavender covers keep `.u-limit-target`. Other images in a Sidebar use `.u-cap`. `--sidebar-target` is set on the Sidebar, so it inherits. The shield is not in a Sidebar; it sets the variable on itself.

### Cluster

The buy row is a Cluster: items in a row, centered, wrapping, one gap.

```css
.cluster {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	gap: var(--space, var(--space-s));
}
.cluster.cluster > * {
	margin-block: 0;
}
```

`.cluster.cluster > *` is `(0, 2, 0)`. It beats `.ProductPage p` at `(0, 1, 1)`. `.ProductBuy`’s `margin-top: var(--space-s)` is `(0, 1, 0)`, so the reset also beats it. The row’s `gap` is the only separation. Button padding stays. A Stack that contains a button still uses the existing `.ProductPage .stack > .ProductBuy` rule (`align-self: flex-start`), so a button in a column does not stretch.

`.ProductCtaRow` in `product-landing.webc` is removed once both rows use `.cluster`. The label keeps `.ProductCtaRow-text` for its measure and weight. That class does not own the row gap.

### Center

The offer is a centered column. The FAQ is not: a Center around `details` shrinks each closed question to its own width and recenters it when the answer opens. FAQ layout is in its own section.

`.ProductBand` already pads, so Center does not add padding. `.center` must not be the same element as `.ProductBand-inner`. Both set a max on the inline axis at `(0, 1, 0)`: `max-inline-size` on `.center`, `max-width: var(--scale-max-width)` on `.ProductBand-inner`. In horizontal writing those are the same constraint. Product CSS follows `main.css`, so the band’s `62rem` wins and the `36rem` measure never applies.

```css
.center {
	display: flex;
	flex-direction: column;
	align-items: center;
	max-inline-size: var(--measure, var(--line-length));
	margin-inline: auto;
	text-align: center;
}
.center > .stack {
	align-self: stretch;
	inline-size: 100%;
}
```

`.center > .stack` is `(0, 2, 0)`. It stretches the Stack to the Center’s measure. `align-items: center` on `.center` would otherwise shrink that Stack to its content. The Center does not reset margins. The Stack does.

`text-align: center` does not center a flex item. A capped image in the Stack stays at the start unless that image sets `align-self: center`.

```css
.u-self-center {
	align-self: center;
}
```

## Shared bands

Buy URLs stay: desafios `https://pay.hotmart.com/P105436287K?off=genqht8i&amp;hotfeature=51`, grammar `https://pay.hotmart.com/G105401127H?off=nkksa3ym&amp;hotfeature=51`.

### Hero

`src/components/product-hero.webc`. Drop `.ProductHero-grid` and its `48em` rule, including the `--space-l` gap. Keep the grid’s `max-width: 55rem` and `margin-inline: auto` on the Sidebar wrapper. That cap is the hero’s measure. The band’s own padding stays; the grid’s extra inline padding is not copied on top of it.

```css
.ProductHero-frame {
	max-width: 55rem;
	margin-inline: auto;
}
```

The cover is the pane. The copy is the first child, so the `:has()` rule gives it the content role: `min-inline-size: 50%`. The cover pane is the child with `min-inline-size: 0`. That replaces the grid item’s `min-width: auto` on the title, so the title can wrap. Do not clip the page.

The button and the chevron are separate. `.ProductBuy` is `inline-flex`, and `.ProductHero-chevron` sets `width: 13.2ch` at `font-size: var(--size-1)`. At a 32px root on a 320px window, `13.2ch` is wider than the copy column, and the button’s min-content (label plus `2.1em` of horizontal padding) can be too. `min-width: auto` on those flex items keeps that intrinsic width.

```css
.ProductPage .stack > .ProductBuy {
	min-inline-size: 0;
	max-inline-size: 100%;
}
.ProductHero-chevron {
	width: min(13.2ch, 100%);
	min-inline-size: 0;
	max-inline-size: 100%;
}
```

The existing `.ProductPage .stack > .ProductBuy` rule is `(0, 2, 1)`. Add the two size constraints there. It already sets `align-self: flex-start`, `margin: 0`, and `margin-block-start: var(--space, var(--space-s))`. The chevron rule is `(0, 1, 0)`, same as today’s width declaration; this replaces `width: 13.2ch`. The chevron’s `font-size: var(--size-1)` stays. Button padding stays. `white-space: normal` on `.ProductBuy` stays, so the label can wrap inside the column.

```html
<section class="ProductBand ProductBand--white ProductHero">
	<div class="ProductHero-frame with-sidebar" style="--sidebar-target: 480px">
		<div class="stack">
			<h1>...</h1>
			<p class="ProductHero-lede">...</p>
			<p class="ProductHero-intro">...</p>
			<a class="ProductBuy" href="...">Comprar agora</a>
			<p class="ProductHero-chevron" aria-hidden="true"><span>⌄</span><span>⌄</span></p>
		</div>
		<img class="with-sidebar-pane u-cap" eleventy:ignore src="..." alt="..." width="..." height="..." loading="eager" decoding="async" />
	</div>
</section>
```

`.ProductHero` keeps its band padding. `.ProductHero-cover` and `max-height: 24rem` go away. The chevron color becomes `var(--orange)`. Hotmart’s chevron is `#EF4E23`. `--orange` is `#f25921`. One orange.

`.ProductHero-lede` keeps `font-size: var(--size-0)`. Do not add `.u-size-1`. `.ProductHero-intro` loses its `font-size` declaration and inherits the root. Its `max-width: 40ch` stays.

Cover files and attributes: desafios `/img/landing/100-desafios-cover.webp`, 512×800. Grammar `/img/landing/grammaire-a1-hero.webp`, 1414×2000. Both use the 480px target. The displayed height is the file ratio, so the grammar cover is shorter than the desafios cover at the same width (`480 × 2000 / 1414` against `480 × 800 / 512`).

There is one button size. `.ProductBuy` sets `font-size: clamp(.95rem, 1.5vw, 1.15rem)`. At 1240px the root is 22px, so the bounds are 20.9px (`0.95 × 22`) and 25.3px (`1.15 × 22`). The preferred value is `1.5vw` of 1240px, 18.6px, which is below the lower bound, so the used size is 20.9px. Hotmart uses 20px on the hero button and 26px on the band buttons. Leave the clamp.

### Sobre

Replace `.ProductSplit` with a Sidebar. The image is the first child. Target `349px` on both pages.

Desafios image: `/img/landing/100-desafios-pages.webp`, 414×649, alt “Páginas do ebook 100 desafios práticos”. Grammar image: `/img/landing/grammaire-a1-open.webp`, 800×1277, alt “Páginas internas da Grammaire Chouette A1”.

```html
<section class="ProductBand ProductBand--blue">
	<div class="ProductBand-inner with-sidebar" style="--sidebar-target: 349px">
		<img class="u-cap" eleventy:ignore src="..." alt="..." width="..." height="..." loading="lazy" decoding="async" />
		<div class="stack">
			<h2 class="u-size-0 u-weight-700 u-features-normal">Sobre o desafio</h2>
			<p class="u-measure">...</p>
		</div>
	</div>
</section>
```

The grammar heading is “Sobre a gramática”. The heading is white because `.ProductBand--blue h2` is `(0, 1, 1)` and sets `color: #fff`. `.u-size-0` and `.u-weight-700` do not set color, so they do not have to beat that rule. `h2` sets `font-weight: 400` at `(0, 0, 1)`. `.u-weight-700 { font-weight: 700; }` wins. `.u-features-normal` is already defined and clears `"c2sc"`.

Paragraphs inherit the band’s white. They do not get the lavender stack’s `#024282` or weight 700. Hotmart’s body there is regular weight.

### Buy rows

Both blue rows, on both pages, are a Cluster: button, then the product name. The second row no longer carries the support lines.

Desafios label, both rows: “100 desafios práticos para falar francês com confiança”. Grammar label, both rows: “Grammaire Complète pour débutant A1 + Livro de respostas”.

```html
<section class="ProductBand ProductBand--blue">
	<div class="ProductBand-inner cluster">
		<a class="ProductBuy" href="...">Comprar agora</a>
		<p class="ProductCtaRow-text u-size-0 u-weight-700">...</p>
	</div>
</section>
```

`.ProductCtaRow-text` keeps `max-width: 28ch` and left alignment of that label. It does not own the row’s gap. It currently sets `font-size: clamp(1.1rem, 2vw, 1.6rem)` at `(0, 1, 0)`, the same as `.u-size-0`. Delete that font-size from the class. The utility is the only font-size, and its used value is the descendant `--size-0` (22.6px / 28.7px), not the inherited root.

### School

Copy first, photo as the pane. Target `415px`, which is the width of `/img/landing/Quem-Somos.webp` (415×423). Hotmart caps this photo at 480px. The file we have is 415px wide, and the cap does not upscale it.

Heading “Chouette Institut de français” gets `.u-color-blue`, `.u-size-0`, `.u-weight-700`, `.u-features-normal`.

```css
.u-color-blue {
	color: #024282;
}
```

No `!important`. `.ProductBand--white` does not set an `h2` color. `.ProductPage h2` does not either. A class beats the inherited color. The blue-band heading rule does not match this white band. Do not put `.u-color-blue` on a blue-band heading; without `!important` the white `#fff` rule would win there anyway, and the class would be pointless.

```html
<section class="ProductBand ProductBand--white">
	<div class="ProductBand-inner with-sidebar" style="--sidebar-target: 415px">
		<div class="stack">
			<h2 class="u-color-blue u-size-0 u-weight-700 u-features-normal">Chouette Institut de français</h2>
			<p class="u-measure">...</p>
			<a class="ProductBuy" href="...">Comprar agora</a>
		</div>
		<img class="with-sidebar-pane u-cap" eleventy:ignore src="/img/landing/Quem-Somos.webp" alt="Equipe da Chouette Institut de français" width="415" height="423" loading="lazy" decoding="async" />
	</div>
</section>
```

The buy link stays inside the copy Stack, with the existing Stack button rule. Same URL as that page’s hero. The three paragraphs stay as they are in each route.

### Support

Move the two short lines and the guarantee sentence out of the blue row into a white band. Owners move with them: nested Stack at `--space: var(--space-2xs)` for the two lines, then one `margin-top: var(--space-m)` on the guarantee. Do not also give that boundary a parent gap.

```html
<section class="ProductBand ProductBand--white">
	<div class="ProductBand-inner stack">
		<div class="stack" style="--space: var(--space-2xs)">
			<p class="u-size-0 u-weight-700">Suporte e tira-dúvidas diretamente com a</p>
			<p><strong class="u-color-blue">Chouette Institut de français</strong></p>
		</div>
		<p style="margin-top: var(--space-m)">Você conta com um suporte e canal de tira-dúvidas diretamente via WhatsApp com a Chouette. Caso você não esteja satisfeito, devolvemos seu dinheiro.</p>
	</div>
</section>
```

The first line of that pair is the support heading on Hotmart (31px). It is a paragraph here, not a second `h2`, because the school band already has the section heading and this line is one message with the school name. Size it with `.u-size-0` and `.u-weight-700` on that first paragraph. The used size is the explicit descendant token, 22.6px / 28.7px. The school name stays `strong`. Body color on the white band is the page’s `#191c1f`. Hotmart paints the name `rgb(2, 66, 130)`; `strong` can take `.u-color-blue`.

The Hotmart screenshot (`capture_dcran_du_2026-04-15_18-28-21.png`, displayed at a 300px cap and a fixed 368px crop) is not in `src/static/img/landing/`. This pass does not download it and does not hotlink it. When a sized WebP is added at `src/static/img/landing/suporte-whatsapp.webp`, this band becomes a Sidebar with that file as the first child, `--sidebar-target: 300px`, and `.u-cap`. No fixed height, so the file’s ratio is the crop. Until that file exists, the band is the stack above.

The fixed WhatsApp button (`whatsapp-fixed`) stays. Hotmart’s “Ficou alguma dúvida?” popup is not a band on these pages. Do not rebuild it.

### Offer

One blue band. `ProductBand-inner` and `.center` are two elements. The Stack is inside the Center and stretches to the Center’s `--line-length` measure. `product-pricing.webc` stops rendering its own `<section class="ProductBand ProductBand--blue">`. The route owns the band. The component’s root is `<div class="ProductPriceBlock">` containing the rule, the optional struck price, the amount, the button, and the security line. That root is not a Stack. The outer Stack separates the shield, the sentence, and that root at `--space-s`.

The shield takes `.u-self-center`. Without it, `align-items: center` on `.center` only centers the Stack, and the image stays at the Stack’s start.

```html
<section class="ProductBand ProductBand--blue">
	<div class="ProductBand-inner">
		<div class="center">
			<div class="stack">
				<img class="u-cap u-self-center" style="--sidebar-target: 100px" eleventy:ignore src="/img/landing/100-desafios-device.webp" alt="" width="273" height="332" loading="lazy" decoding="async" />
				<p>Acesse seus <strong>100 Desafios práticos para falar francês com confiança</strong> onde você estiver, em qualquer dispositivo!</p>
				<product-pricing was="49" price="26" buyHref="..."></product-pricing>
			</div>
		</div>
	</div>
</section>
```

Grammar uses `/img/landing/grammaire-a1-device.webp` and “Acesse sua **Grammaire Complète pour débutant A1** onde você estiver, em qualquer dispositivo!”. Grammar passes no `was`. The empty `alt` matches a decorative shield; the sentence next to it is the text.

The amount uses `.u-size-5`. Remove the clamp from `.ProductPriceBlock-now`. The struck price and the “por apenas” label already set `font-size: var(--size-0)` on `.ProductPriceBlock-was` and `.ProductPriceBlock-label`. Leave those declarations. Do not add `.u-size-0` or `.u-size-1` beside them: the class and the utility are both `(0, 1, 0)`, and the class is in the later product CSS. The label stays uppercase. The struck price stays white with `text-decoration: line-through`. Hotmart colors part of “DE 49 REAIS” red. A red fragment inside the string is not a second price style.

`.ProductPage p` is `(0, 1, 1)` and beats `.ProductPriceBlock-now`’s margin shorthand at `(0, 1, 0)`, so the amount currently keeps a paragraph bottom margin of `--space-xs`. `.ProductBuy` then adds `margin-top: var(--space-s)`. Those two margins are the gap above the button. `--space-2xs` on `.ProductPriceBlock-now` does not win today. The price group needs its own owner, local to the block:

```css
.ProductPriceBlock.ProductPriceBlock > * {
	margin-block: 0;
}
.ProductPriceBlock.ProductPriceBlock > * + * {
	margin-block-start: var(--space-2xs);
}
.ProductPriceBlock-rule {
	margin-inline: auto;
}
.ProductPriceBlock-note {
	font-size: var(--size--3);
}
```

`.ProductPriceBlock.ProductPriceBlock > *` is `(0, 2, 0)`. It beats `.ProductPage p` at `(0, 1, 1)` and `.ProductBuy`’s `margin-top` at `(0, 1, 0)`, so the block reset already clears the button’s original margin. `.ProductPriceBlock .ProductBuy { margin: 0 }` is also `(0, 2, 0)`. It would follow `> * + *` and its `margin` shorthand would set the button’s top margin back to 0 while the other siblings keep `--space-2xs`. Do not add that rule. `.ProductPage p:last-child` is `(0, 2, 1)` and still wins the note’s bottom margin. That rule sets the bottom to 0, which is the edge this reset was clearing. The note is not the first child, so its top gap comes from `> * + *`. The button is a following sibling, so its top gap is the same `--space-2xs`. Remove `margin` from `.ProductPriceBlock-now`, `margin-top` from `.ProductPriceBlock-note`, and the block margins from `.ProductPriceBlock-rule`. The rule keeps `margin-inline: auto` and `max-width: 28rem`.

The button is not a direct child of a Stack. `.ProductPage .stack > .ProductBuy` is `(0, 2, 1)` and would put `--space-s` back if the button were. It does not match inside `.ProductPriceBlock`.

Every boundary inside the price block is `--space-2xs`. The outer Stack’s `--space-s` is only the shield, the sentence, and the block. The Center’s default measure, `--line-length`, replaces Hotmart’s 64% text width and 56% button width.

### FAQ

Keep `details` / `summary`. The heading is centered on its own. The disclosures are normal blocks in `.ProductBand-inner`, so each one is the width of that inner, closed or open. Text stays at the start. `.center` is not on this band, so `text-align` and `align-items` do not move the rows.

```html
<div class="ProductBand-inner">
	<h2 class="u-size-0 u-weight-700 u-features-normal">Perguntas frequentes</h2>
	<div class="s-rich-text">
		<!-- details, unchanged copy -->
	</div>
</div>
```

```css
.ProductFaq h2 {
	text-align: center;
}
```

`.ProductFaq h2` is `(0, 1, 1)`. `.ProductFaq .s-rich-text > p` already sets `max-width: none`, so the answer paragraphs stay the full inner width. Their text alignment is the initial start. Do not set `text-align: center` on `.ProductFaq` or on `.s-rich-text`.

`details` padding and the open summary’s bottom margin stay `--space-2xs`. The summary remains the focusable control. Do not put a button inside it. `display: flex` on the summary does not replace the native toggle.

The marker is the specific piece. Summary text stays the question. An orange mark uses `--orange`, not `#EF4E23`.

```css
.ProductFaq summary {
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: var(--space-2xs);
}
.ProductFaq summary::after {
	content: "⌄";
	color: var(--orange);
	font-weight: 700;
}
.ProductFaq details[open] summary::after {
	content: "⌃";
}
```

`list-style: none` and the webkit marker rule stay, or the disclosure triangle and this mark both show. The mark is not a background image and not a Hotmart icon font.

FAQ copy stays as written in each route. Do not import Hotmart’s numbered “Entrar / Minha conta / Minhas compras” steps.

## Grammar lavender pitch

This is the same composition as the desafios atividades band. The earlier dark heading was only so `.u-color-red` would not paint every lavender `h2`. The utilities are opt-in. This heading opts in. `.ProductSplit` does not grow a pitch variant.

Cover `/img/landing/grammaire-a1-covers.webp`, 1414×2000. Target `409px`, Hotmart’s cap for this image. `1rem` radius via `.u-limit-target`. Heading text stays “Caderno de respostas e suporte WhatsApp”, as an `h2`. The hero owns the only `h1`.

```html
<section class="ProductBand ProductBand--lavender">
	<div class="ProductBand-inner with-sidebar" style="--sidebar-target: 409px">
		<img class="u-limit-target" eleventy:ignore src="/img/landing/grammaire-a1-covers.webp" alt="Capas da Grammaire Chouette A1 e caderno de respostas" width="1414" height="2000" loading="lazy" decoding="async" />
		<div class="stack" style="color: #024282; font-weight: 700; line-height: 1.5">
			<h2 class="u-color-red u-weight-900 u-size-2 u-leading-15 u-features-normal">Caderno de respostas e suporte WhatsApp</h2>
			<p class="u-measure">Além de explicações claras e completas, você recebe, após 7 dias, o caderno de correção com as respostas de todos os exercícios, para conferir seu progresso e revisar com segurança.</p>
			<p class="u-measure">E se surgir alguma dúvida no caminho? Seja sobre um ponto gramatical ou um exercício específico, você conta com o suporte personalizado da Chouette pelo WhatsApp, para aprender com mais confiança e não ficar travado em nenhuma etapa do processo.</p>
			<p class="u-measure">Porque aprender francês fica muito mais fácil quando você tem acompanhamento de verdade.</p>
		</div>
	</div>
</section>
```

Weight 900 is the utility the desafios pitch already uses. Hotmart marks that grammar title with `strong` (700) rather than a 900 rule. One pitch heading is enough; this page uses the shipped utilities.

## Retire `.ProductSplit`

After both routes have no `.ProductSplit`, delete `.ProductSplit`, `.ProductSplit-media`, `.ProductSplit-body`, `.ProductSplit--reverse`, and the `48em` block from `product-landing.webc`. Nothing else in `src/` uses them. Do not delete them while a route still has the class.

## Left out

- Montserrat, Bebas Neue, and a 14/16/18px body query.
- Hotmart’s centered stack under 834px, and the darker `#05234A` “sobre” band.
- An 88px price, a 26px band button, and a red slice inside “DE 49 REAIS”.
- The support screenshot, until `src/static/img/landing/suporte-whatsapp.webp` exists.
- The “Ficou alguma dúvida?” popup, the Hotmart footer, and `whatsapp-fixed`.
- Homepage and the other landing pages.
- Eleventy bundle, image-plugin, README, package identity, and input-path cleanup.
- Rewriting FAQ answers.
- Clipping the hero. The 490px figure is replaced only if a fresh check shows `scrollWidth` equal to `clientWidth`.

## Order and checks

Each step is one band group, then a browser check on both product pages. Node 26, `nvm use`, then `npm run build`. Restart `npm run dev` if `product-landing.webc` or `main.css` changed; an already-running incremental server is not evidence. `/main.css` stays `text/css` with no doctype.

Viewports: 320, 760, 800, and 1240px wide, plus root font 200% (32px) at 320px. Measure border boxes. `clientWidth` may be 1225 at the wide viewport when a scrollbar is present.

1. Add `.u-cap`, `.u-size-0`, `.u-size-5`, `.u-self-center`, `.u-weight-700`, `.u-color-blue`, `.cluster`, `.center`, and the Sidebar pane rules. Reload `/100-desafios/` and confirm the atividades band is unchanged: red heading `rgb(215, 25, 32)`, weight 900, line-height ratio 1.5, cover cap 366px, Sidebar gap 42.33px at the wide root, prose gap 28.22px, `scrollWidth` equals `clientWidth` at 320px.
2. Hero. The frame’s used `max-width` is `55rem`. Cover used width is at most 480px and shrinks inside 320px. No `max-height: 24rem`. Copy is first in the DOM; the cover is on the right while they share a row. Gap is `--space-m` (42.33px at the wide root, 32.06px at 320px), not `--space-l`. Chevron is `--orange`. Lede computed size is the descendant `--size-0` (about 22.6px at 320, about 28.7px at 1240). Intro computed size is the inherited root (19px / 22px), and `.ProductHero-intro` has no `font-size`. One `h1`. At a 32px root on a 320px window, record `scrollWidth`, the title’s right edge, the buy button’s right edge, and the chevron’s right edge. Each of those stays inside the copy column. The band stays within 320px.
3. Sobre, both pages. Image left, target 349px, no radius, `loading="lazy"` `decoding="async"`. Heading computed size is the descendant `--size-0`, weight 700, white. Paragraphs inherit the root size. Paragraph gap `--space-s`. No `48em` rule on these rows.
4. Both buy rows, both pages. Second row label is the product name. Support sentences are gone from that row. Cluster gap `--space-s`. Button is not stretched. Label computed size is the descendant `--size-0`. `.ProductCtaRow-text` does not set `font-size`.
5. Grammar lavender pitch. Same computed heading as the desafios pitch (red, weight 900, `--size-2` at 32.5px / 43.7px, line-height ratio 1.5). Cover cap 409px, radius `1rem`, file attributes 1414 and 2000, lazy and async. Body `#024282`, weight 700, inherited root size.
6. School, both pages. Photo on the right, target 415px, copy first in the DOM, lazy and async. Heading `#024282`, descendant `--size-0`, weight 700. Buy button 267px wide at the wide root, `align-self: flex-start`.
7. Support white band, text only, both pages. The first line is the descendant `--size-0`. Two lines 14.11px apart at the wide root. Guarantee 42.33px below, from `margin-top` only. Blue rows above do not repeat those sentences.
8. Offer. `.center` is inside `.ProductBand-inner`, and the Center’s used `max-inline-size` is `--line-length` (36rem), not the band’s 62rem. Shield used width at most 100px, no radius, lazy and async. The shield’s horizontal center matches the Center element’s horizontal center within 1px. Amount is the used `--size-5` (about 56.1px at 320, about 82.3px at 1240). Label and struck price stay on the explicit `--size-0` token. Inside `.ProductPriceBlock`, each following sibling’s `margin-block-start` is `--space-2xs` (14.11px at the wide root), including the buy button. The button’s used `margin-top` is that token, not 0. The note’s `font-size` is `var(--size--3)`. Grammar has no struck price. Desafios still shows “De R$ 49” in white with a line-through. The old white shield split is gone. `.ProductBuy`’s used font-size at 1240px is 20.9px.
9. FAQ. Tab reaches each `summary`. Enter and Space toggle the focused one. A closed `details` and an open `details` have the same inline size, equal to the band inner’s content width. The marker’s inline end does not move when a row opens. Answer text is at the start, not centered. Open summary margin and `details` padding stay `--space-2xs`. The mark is `--orange`. Heading computed size is the descendant `--size-0`. Summary and answer have no `font-size` and use the inherited root.
10. Delete `.ProductSplit` only after step 3, 5, 6, and 8 have removed every use. Repeat the spacing baseline on both pages: prose 28.22px, media gap 42.33px, support lines 14.11px, guarantee 42.33px, at the wide root. At 760px a Sidebar that has wrapped is one column with the same `--space-m` gap. At 800px it may still be one column or two; the gap does not become `--space-l`. Homepage and `/sobre-a-escola/` still load the stylesheet: blue page background, no new horizontal overflow at the wide viewport. Cold load, each product page: a 1240×900 viewport, cache disabled, no scrolling. After the load settles, sum the transfer size of every request. That includes the document, `/main.css`, the component stylesheet from `getBundleFileUrl('css')` (`/bundle/*.css`), the Google Fonts stylesheet, the font files it requests, icons and `/site.webmanifest` when the browser requests them, and every image requested on that load. A `loading="lazy"` image near the viewport counts. The module script is inlined in the document. Tracking stays unloaded until consent. The sum is within 300 kB. This pass adds no font and no image file.

The generic Stack, Sidebar, Cluster, Center, and utilities stay in `main.css`. Band color and the instance targets stay in the component or on the element that needs them.
