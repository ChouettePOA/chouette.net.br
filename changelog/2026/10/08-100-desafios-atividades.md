# 100 desafios — atividades por menos de 30 centavos

- **Date:** 2026-10-08
- **Status:** planned
- **Scope:** the band whose heading is “Atividades para todos os níveis por menos de 30 centavos por desafio!” on `/100-desafios/`
- **Page:** http://chouette.localhost:8080/100-desafios/
- **Source:** https://chouettefrances.hotmart.host/100-desafios (section `#ls-7Hd31uThjLt1fbLwfoDFgg`)

## Context

The copy is already on the page. The band is not. In `src/routes/100-desafios.webc` it is a white `ProductBand` with an `h2` and three paragraphs, and no cover.

On Hotmart the same copy sits in a lavender band (`rgb(209, 190, 221)`, already `#d1bedd` / `.ProductBand--lavender`):

- Two equal columns, vertically centered. Under 834px they stack and center.
- Left: the croissant cover, displayed at 366×560 with `border-radius: 16px`. The file is 512×800: `/img/landing/100-desafios-cover.webp` (about 35 kB), already used by the hero. Reuse that URL. A second request hits the cache, so the cold load does not grow by another image. The HTML `width` and `height` are the file’s 512 and 800. CSS sets the display size. 366×560 is a different ratio (0.654 against 0.64).
- Right: the heading in red (`rgb(215, 25, 35)`, site `--red` is `#d71920`) at 41px / line-height 1.5, weight 900. Under 834px it is 32px and centered.
- Body copy in `#024282`, 18px, weight 700, line-height 1.5, max-width 80% of the text column. Under 834px it is 16px, centered, max-width 90%.
- The three paragraphs stay as they are. The heading stays an `h2`. The hero already owns the page `h1`. Hotmart’s inline highlight on the heading is the same lavender as the band, so it does not show. Leave it out.
- Hotmart sets Montserrat. This site already loads Raleway for headings and Quattrocento Sans for body. Keep those. Do not add a font.

`.ProductBand--lavender` already paints this color in `src/components/product-landing.webc`. The grammar page uses it with `.ProductSplit`, a two-column grid that flips at `48em`. That grid is a manual override. This band does not grow it, and it does not get a `.ProductPitch` that owns columns, type, and color together.

## Design order

Every Layout (*Composition*, *Global and local styling*) styles in three tiers. Reach comes first. The specific band is last.

1. **Global.** Already in `src/routes/main.css`: the Utopia type and space scales, `--red`, `--line-length`, and `img { max-width: 100% }`. Do not change `h2` or `p` to serve this band. The heading stays an `h2`. The hero already owns the page `h1`.
2. **Primitives.** Compose the layout from algorithms in the book. CSS only, in `main.css` beside `u-container` and `u-vspacer`. No custom elements, no new script.
3. **Specific.** Color, weight, radius, and the heading’s type step. These do not describe columns, gaps, or breakpoints.

### Primitives this band actually uses

**Sidebar** (`with-sidebar`), not Switcher and not `.ProductSplit`. The cover has a width. The copy takes the rest and wraps when it cannot keep half the row.

```css
.with-sidebar {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: var(--gutter, var(--space-m));
	--sidebar-target: 20rem;
}
.with-sidebar > :first-child {
	flex-basis: var(--sidebar-target);
	flex-grow: 1;
	/* The default min-width: auto will not shrink below the cover’s intrinsic size. */
	min-inline-size: 0;
}
.with-sidebar > :last-child {
	flex-basis: 0;
	flex-grow: 999;
	min-inline-size: 50%;
}
```

`align-items: center` is the cross-axis configuration, so the cover and the copy share a vertical center while they sit side by side. The wrap is the narrow layout. There is no `@media`. `--sidebar-target` is the primitive’s width. This band sets it to `366px`, the reference display width. The primitive does not hardcode that cover.

`23rem` is not that width. `html` uses `font-size: var(--size-0)`, which is 19px at a 320px viewport and 22px at 1240px, so `1rem` is 19–22px. `23rem` is 437–506px.

**Stack**, for the heading and the three paragraphs. One space, from the existing scale.

`.stack > *` is specificity (0, 1, 0). It loses to rules already on this page:

| Rule | Specificity | What it sets |
| --- | --- | --- |
| `.ProductPage h2` | (0, 1, 1) | `margin: 0 0 var(--space-s)` |
| `.ProductPage p` | (0, 1, 1) | `margin: 0 0 var(--space-xs)` |
| `.ProductPage p:last-child` | (0, 2, 1) | `margin-bottom: 0` |

`:last-child` is a pseudo-class, so it counts in the class column beside `.ProductPage`. That selector is one class, one pseudo-class, and one element.

Product CSS is bundled and can come after `main.css`, so a tie on specificity is not a strategy. `gap` on `.stack` does not remove those margins. The heading would keep its bottom margin and each paragraph would keep `--space-xs` under it.

The reset is `.stack.stack > *` at (0, 2, 0). It beats `.ProductPage h2` and `.ProductPage p`, both (0, 1, 1), whatever the source order. It does not beat `.ProductPage p:last-child` at (0, 2, 1): the class columns match, and the element column decides. That loss is harmless. The rule that wins also sets the bottom margin to zero, which is the edge the reset was clearing. Spacing between items still comes from `.stack.stack > * + *`, because `:last-child` does not set the top margin.

Doubling the class keeps the primitive global. It does not mention `.ProductPage`, so bands that are not a Stack keep the product margins. The grammar page has no `.stack`.

```css
.stack {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
}
.stack.stack > * {
	margin-block: 0;
}
.stack.stack > * + * {
	margin-block-start: var(--space, var(--space-s));
}
```

The second rule follows the first, so successive children take `--space` and the others stay at 0. A later exception still changes `--space` on one child, which is the book’s Stack exception. It does not have to fight the margin declarations.

**Left out on purpose.**

- **Frame.** The cover file already has the right ratio. Cropping it into a frame adds nothing.
- **A new Box.** `.ProductBand` is the padded container. `.ProductBand--lavender` is the paint.
- **Hotmart’s centered stack under 834px.** That is a breakpoint override. The Sidebar’s wrap is the responsive behavior. Text and cover stay at the start in both configurations.
- **Montserrat, and a 16px/18px body-size query.** Raleway and Quattrocento Sans stay. Body copy keeps the root size, 19–22px. The reference is 16px under 834px and 18px above. That departure is deliberate.
- **`--size-3` for the heading.** It is `clamp(2.052rem, 1.8316rem + 1.1018vi, 2.6855rem)`. Those `rem` resolve against the 19–22px root, so the step is about 39px at 320px (`2.052 × 19`) and about 54px at 1240px (`1.8316 × 22 + 1.1018 × 12.4`). The reference heading is 32px under 834px and 41px from there up. The nearest step is `--size-2`, `clamp(1.71rem, 1.5575rem + 0.7625vi, 2.1484rem)`: about 32.5px at 320px (`1.71 × 19`) and about 43.7px at 1240px (`1.5575 × 22 + 0.7625 × 12.4`). It meets the narrow end and runs about 3px over 41px at 1240px.

### Specific layer

Markup in `src/routes/100-desafios.webc`:

```html
<section class="ProductBand ProductBand--lavender">
	<div class="ProductBand-inner with-sidebar" style="--sidebar-target: 366px">
		<img class="u-limit-target" eleventy:ignore src="/img/landing/100-desafios-cover.webp" alt="Capa do ebook 100 desafios práticos para falar francês com confiança" width="512" height="800" />
		<div class="stack" style="color: #024282; font-weight: 700; line-height: 1.5">
			<h2 class="u-color-red u-weight-900 u-size-2 u-leading-15 u-features-normal">Atividades para todos os níveis por menos de 30 centavos por desafio!</h2>
			<p>Ideal para todos os níveis!</p>
			<p>O material permite que você avance no seu próprio ritmo, realizando as atividades de acordo com seus conhecimentos e objetivos.</p>
			<p>E o melhor: cada desafio custa menos de 30 centavos, tornando o seu aprendizado acessível, prático e eficiente.</p>
		</div>
	</div>
</section>
```

The copy is unchanged. `eleventy:ignore` matches the other landing images. The hero already requests this file. `--sidebar-target: 366px` is this instance’s configuration. The `width` and `height` attributes are the file’s pixels, so the reserved ratio is 512/800.

What is specific, and where it lives. Each rule names the property. None of them is `.with-sidebar h2` or `.ProductBand--lavender p`.

**Color.** `.ProductBand--lavender h2, .ProductBand--lavender h3` is two selectors. A comma does not add them together, so each one is counted on its own: one class and one element, (0, 1, 1). `.u-color-red` is (0, 1, 0). The class columns match, and the element column lets the heading rule win, so a plain utility leaves the heading dark. Utilities are the final tier in *Global and local styling*, so this one wins by importance, not by a context selector. Grammar headings do not carry the class. Their lavender rule still paints `#191c1f`.

```css
.u-color-red {
	color: var(--red) !important;
}
```

The Stack element on this band sets `color: #024282`, `font-weight: 700`, and `line-height: 1.5`. Those are instance values, not part of the `.stack` primitive. Paragraphs do not set color, weight, or line-height, so they inherit all three. Product pages already use that blue.

**Weight and heading measure.** `h2` sets `font-weight: 400` and `line-height: 1.1`. A weight or line-height on the Stack does not reach the heading. `.ProductPage h2` does not set weight (that declaration is commented out). The reference heading is weight 900 and line-height 1.5. Raleway is already loaded on the 100–900 axis, so 900 adds no request.

These four utilities only have to beat the element rule `h2` at (0, 0, 1). A single class is enough. They do not need `!important`.

```css
.u-weight-900 { font-weight: 900; }
.u-size-2 { font-size: var(--size-2); }
.u-leading-15 { line-height: 1.5; }
.u-features-normal { font-feature-settings: normal; }
```

`.ProductPage h1, h2, h3` already sets `font-variant: normal`. The base `h2` still sets `font-feature-settings: "c2sc"`, which is a separate property, so `.u-features-normal` clears it.

`p` does not set a weight, so the paragraphs inherit the 700 from this Stack. The heading does not.

**Cover.** `max-inline-size: 23rem` is a different constraint from the global `img { max-width: 100% }`, and in horizontal writing it takes the inline axis. On a flex item the default `min-width: auto` also refuses to shrink below the image’s minimum, which a `width="366"` attribute pins at 366px. At a 320px viewport that cover stays 366px wide and the page grows past the viewport (about 398px once the band’s horizontal padding is included).

The primitive’s `min-inline-size: 0` lets the flex item shrink. The image carries `.u-limit-target`. `--sidebar-target` inherits from the Sidebar, so the cap stays `min(100%, 366px)` on this band and does not hardcode the cover into `.with-sidebar`.

```css
.u-limit-target {
	max-inline-size: min(100%, var(--sidebar-target));
	block-size: auto;
	border-radius: 1rem;
}
```

`1rem` of radius is 19–22px. The reference is 16px. The root step is the value we use. It is not a claim that the two radii match.

**Measure.** The paragraphs stay inside the column. Cap them with the existing `--line-length` (or `60ch` if that column still feels long). A percentage such as Hotmart’s 80% does not survive a font-size change.

Neighboring bands stay as they are: “Sobre o desafio”, the buy row above, “Chouette Institut de français”, the price block, and the FAQ.

## Check

These checks have not been run. The page source is unchanged. Run them in the browser after the band is implemented, on http://chouette.localhost:8080/100-desafios/, wide and narrow, by resizing. Also at a 320px viewport and with text enlarged (browser zoom or a root size of about 200%).

- Lavender band. Cover on the left, red title, blue bold copy on the right.
- Wrap: `flex-direction` stays `row`. Narrowing until the copy cannot keep `min-inline-size: 50%` puts the copy’s top below the cover’s top. No width query does that.
- Overflow: at 320px, and again with enlarged text, `document.documentElement.scrollWidth` equals `document.documentElement.clientWidth`. The cover’s used width is at most the inner width of the band. It is not stuck at 366px or at the file’s 512px.
- Computed heading: color `rgb(215, 25, 32)` (`--red`), `font-weight` 900, `font-size` the used `--size-2` (about 32.5px at 320, about 43.7px at 1240), `font-feature-settings` normal. The lavender rule’s `#191c1f` does not win. Computed `line-height` comes back in pixels; `parseFloat(lineHeight) / parseFloat(fontSize)` is 1.5.
- Computed paragraphs: color `rgb(2, 66, 130)`, `font-weight` 700, `font-size` the root 19–22px. The same pixel ratio of `line-height` to `font-size` is 1.5.
- Computed margins: the heading and the paragraphs that are not `:last-child` do not keep `.ProductPage`’s `--space-s` or `--space-xs`. Successive children have `margin-block-start` equal to the Stack’s `--space`. The last paragraph’s `margin-bottom` is 0 because `.ProductPage p:last-child` wins that edge, and that value is already 0.
- The hero `h1` is still the only `h1`. The title is mixed case.
- The cover request is the existing `/img/landing/100-desafios-cover.webp`. Its attributes are 512 and 800.
- The grammar page lavender band still uses `.ProductSplit`. Its headings stay `#191c1f`, and its heading and paragraph margins stay the product margins.
- `main.css` holds `.stack`, `.with-sidebar`, and the utilities. `.with-sidebar` reads `--sidebar-target` and defaults it to `20rem`. `product-landing.webc` does not grow a layout class for this heading.
