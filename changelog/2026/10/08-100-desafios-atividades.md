# 100 desafios — atividades por menos de 30 centavos

- **Date:** 2026-10-08
- **Status:** lavender band implemented; spacing uniformization planned
- **Scope:** the band whose heading is “Atividades para todos os níveis por menos de 30 centavos por desafio!” on `/100-desafios/`; a follow-up aligns spacing in comparable product-page bands on `/100-desafios/` and `/grammaire-chouette-a1/`
- **Page:** http://chouette.localhost:8080/100-desafios/
- **Source:** https://chouettefrances.hotmart.host/100-desafios (section `#ls-7Hd31uThjLt1fbLwfoDFgg`)

## Context

Before this change, the copy was already on the page. In `src/routes/100-desafios.webc` it was a white `ProductBand` with an `h2` and three paragraphs, and no cover. The lavender band described below is now implemented. The spacing follow-up at the end is planned and has not been applied or checked in the browser.

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

Doubling the class keeps the primitive global. It does not mention `.ProductPage`, so bands that are not a Stack keep the product margins. The initial implementation adds no `.stack` to the grammar page. The spacing follow-up will opt comparable copy columns into it.

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
				<p class="u-measure">Ideal para todos os níveis!</p>
				<p class="u-measure">O material permite que você avance no seu próprio ritmo, realizando as atividades de acordo com seus conhecimentos e objetivos.</p>
				<p class="u-measure">E o melhor: cada desafio custa menos de 30 centavos, tornando o seu aprendizado acessível, prático e eficiente.</p>
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

**Measure.** The paragraphs stay inside the column. `.u-measure` caps each one at the existing `--line-length`. A percentage such as Hotmart’s 80% does not survive a font-size change.

```css
.u-measure {
	max-inline-size: var(--line-length);
}
```

The initial implementation leaves neighboring bands as they are: “Sobre o desafio”, the buy row above, “Chouette Institut de français”, the price block, and the FAQ. The spacing follow-up below deliberately extends that scope to comparable relationships.

## Lavender band — completed checks

Checked in the browser on 2026-10-08 at http://chouette.localhost:8080/100-desafios/.

- Lavender band. Cover on the left, red title, blue bold copy on the right.
- Wrap: `flex-direction` stays `row`. Narrowing until the copy cannot keep `min-inline-size: 50%` puts the copy’s top below the cover’s top. No width query does that.
- Overflow: at 320px, `scrollWidth` equals `clientWidth` (both 320). The cover’s used width is the band’s inner width (256px), not 366px or 512px. With the root font at 200% the band still fits (right edge 266 inside a 320px viewport). The page’s `scrollWidth` grows to 490 because the hero copy does, which this band does not change.
- Computed heading: color `rgb(215, 25, 32)` (`--red`), `font-weight` 900, `font-size` the used `--size-2` (about 32.5px at 320, about 43.7px at 1240), `font-feature-settings` normal. The lavender rule’s `#191c1f` does not win. Computed `line-height` comes back in pixels; `parseFloat(lineHeight) / parseFloat(fontSize)` is 1.5.
- Computed paragraphs: color `rgb(2, 66, 130)`, `font-weight` 700, `font-size` the root 19–22px. The same pixel ratio of `line-height` to `font-size` is 1.5.
- Computed margins: the heading and the paragraphs that are not `:last-child` do not keep `.ProductPage`’s `--space-s` or `--space-xs`. Successive children have `margin-block-start` equal to the Stack’s `--space`. The last paragraph’s `margin-bottom` is 0 because `.ProductPage p:last-child` wins that edge, and that value is already 0.
- The hero `h1` is still the only `h1`. The title is mixed case.
- The cover request is the existing `/img/landing/100-desafios-cover.webp`. Its attributes are 512 and 800.
- The grammar page lavender band still uses `.ProductSplit`. Its headings stay `#191c1f`, and its heading and paragraph margins stay the product margins.
- `main.css` holds `.stack`, `.with-sidebar`, and the utilities. `.with-sidebar` reads `--sidebar-target` and defaults it to `20rem`. `product-landing.webc` does not grow a layout class for this heading.

## Follow-up — uniform spacing by visual constraint

**Status: implemented.** Checked in the browser on 2026-10-08. The completed checks above describe the lavender band before this follow-up.

### Goal and scope

Elements with the same visual job and similar available width, text size, and line-height should use the same spacing rule. A paragraph in a blue band and one in a lavender band do not need different margins because their colors differ. Content length may change a column's height; it does not justify a different gap between its paragraphs.

Start with the two product pages, which already share `product-landing.webc`. Compare the lavender activities band, “Sobre o desafio” / “Sobre a gramática”, both “Chouette Institut de français” bands, and the grammar page's lavender support band. Include their media/text gutters and repeated buy/support rows. Keep the homepage and other landing-page families outside this pass until their constraints have been compared.

This pass changes spacing and the markup needed to give it one owner. Keep the existing typography, colors, copy, image proportions, column algorithms, and `--line-length`. The grammar page retains `.ProductSplit` and its dark lavender headings; its eligible copy columns will intentionally gain the shared Stack rhythm.

### Current mismatches

| Relationship | Current sources | Why it needs one rule |
| --- | --- | --- |
| Heading followed by prose | `.ProductPage h2` ends with `--space-s`; the lavender Stack adds `--space-s` before the paragraph | Same intended separation, different owners |
| Consecutive prose paragraphs | `.ProductPage p` ends with `--space-xs`; the lavender Stack adds `--space-s` before the next paragraph | Comparable body copy has different rhythm |
| Media beside or above copy | Sidebar uses `--space-m`; `.ProductSplit` uses `--space-m` then `--space-l` at `48em` | The layout algorithm changes the gap even when the relationship is the same |
| Prose followed by a buy button | Paragraph bottom margin and `.ProductBuy` top margin can both contribute | Two elements contribute to the same separation |
| A buy/support row | Row `gap`, direct paragraph margins, and nested text margins | The row needs to own separation between its items; its text needs a separate internal rhythm |

### Shared spacing contract

Use the existing Utopia space scale, with one value for each comparable relationship. Configure the existing `--space` and `--gutter` properties rather than introducing pixel nudges or a separate scale per band.

| Visual constraint | Shared value and owner | Application |
| --- | --- | --- |
| Ordinary prose flow: heading → paragraph, paragraph → paragraph, prose → action | `--space-s`, owned by `.stack` through `--space` | Eligible text columns on both product pages, including the implemented lavender band |
| Media → copy, side by side or wrapped | `--space-m`, owned by the row through `--gutter` | `.with-sidebar` and ordinary `.ProductSplit` rows; the desktop grid changes columns, not this gap |
| Button → supporting text in a buy row | `--space-s`, owned by `.ProductCtaRow`'s `gap` | The repeated buy/support rows on both pages, including when they wrap |
| Short lines that form one supporting message | `--space-2xs`, owned by a nested Stack | “Suporte e tira-dúvidas diretamente com a” followed by the school name; this is a compact message, not two prose paragraphs |
| Buy row → separate support explanation | `--space-m`, owned by the enclosing block flow | The explanation beneath the support row on both pages; avoid combining its existing inline margin with a new parent gap |
| Ordinary band → its content | Existing `.ProductBand` block padding and `--space-m` inline padding | All ordinary product bands already share these values; retain them and remove any redundant padding added by a child for the same inset |

Uniformity applies at a given viewport and text setting. These are fluid tokens, not fixed pixel distances. Do not equate `--size-0`, `1em`, and `--space-s` merely because they happen to be close at one width.

**Intentional exceptions.** The hero has its own narrower measure and introductory hierarchy; pricing has tightly related label/amount/action groups; FAQ spacing must work with the summary border and opened answer. Keep those constraints documented rather than forcing them into ordinary prose spacing. Both pages' heroes, price blocks, and FAQs should still match their corresponding counterpart because they share components. Button padding, text line-height, and the chevron's internal geometry are not sibling spacing. The known hero overflow with enlarged text remains a separate follow-up.

### Implementation sequence

1. Record the current spacing at matching widths on both pages: heading → first paragraph, paragraph → paragraph, final paragraph → action, media → copy, and content → band edge. Measure element border-box boundaries rather than the visible shape of letters. Note each active margin, gap, and padding that contributes.
2. In `src/routes/100-desafios.webc` and `src/routes/grammaire-chouette-a1.webc`, add `.stack` to the eligible copy containers. Reuse the established reset and `--space-s` default in `src/routes/main.css`. Retain needed rich-text and measure classes, and preserve text alignment. Remove spacing-only inline declarations only when another owner replaces them.
3. For an action inside a copy Stack, let that Stack own the prose → action gap. Clear the action's extra block margin in that context. Audit specificity against `.ProductBuy` and `.ProductPage` rules before choosing the selector; leave the button's internal padding intact. Preserve its intended width and horizontal alignment: a flex Stack must not stretch a previously intrinsic-width button across the column. First and last children must not add unused outer block margins.
4. In `src/components/product-landing.webc`, make ordinary `.ProductSplit` use `gap: var(--gutter, var(--space-m))`. Remove its desktop `--space-l` gap override while keeping its column and reverse-order rules. The Sidebar already uses the same gutter contract. Do not convert the grammar grid into a Sidebar merely to share spacing.
5. Make `.ProductCtaRow` own spacing between its direct children, clearing their residual block margins with sufficient specificity. Give its two-line support message a nested Stack with `--space: var(--space-2xs)`. Keep the explanation below the row at one `--space-m` separation, with only one owner for that boundary.
6. Review the shared band insets and the documented exceptions on both pages. Change a shared component when its counterparts have identical constraints; use an explicit token-based exception when they differ. Do not change global `h2`/`p` margins or apply a blanket reset to all rich text on the site.
7. Remove superseded spacing declarations in the migrated contexts, then run the checks below. Update this follow-up's status and record actual results only after those checks have run.

The generic Stack and Sidebar remain in `main.css`. Product-specific spacing configuration remains in `product-landing.webc` or on the instance that needs it. Color modifiers do not select a spacing policy. Keep the existing cascade protections, font-size calculations, and image shrink constraints from the implemented band.

### Acceptance checks — 2026-10-08

- Compare both pages at 320px, 1240px, and immediately before and after their row transitions. Repeat with enlarged text. Compare like relationships at the same viewport and root size; allow normal subpixel rounding.
- Every migrated prose flow uses one `--space-s` gap per boundary. Heading → paragraph, paragraph → paragraph, and prose → action do not retain an extra bottom or top margin. The first child's block-start margin and last child's block-end margin are zero. Buttons keep their intended width and horizontal alignment after their container becomes a flex Stack.
- Ordinary Sidebar and ProductSplit media/text gaps resolve to the same `--space-m` on both sides of wrapping. The grammar page still uses its existing grid and reverse ordering.
- Buy/support rows use one `--space-s` gap between direct children. Their compact nested messages use `--space-2xs`; the explanation below a row uses one `--space-m` separation.
- Ordinary band insets match their counterparts. No additional wrapper padding doubles the same inset. Any retained hero, pricing, or FAQ exception has a stated constraint and matches its counterpart on the other page.
- Check effective boundary distances as well as computed CSS. Two matching tokens are insufficient if a child margin or wrapper padding adds another distance. Repeat with short and multiline text and with FAQ answers open and closed.
- Recheck the implemented lavender band's red heading, weight 900, line-height ratio 1.5, 366px cover cap, paragraph measure, and single page `h1`. Grammar headings retain their existing colors and typography; the intended change there is spacing.
- Compare `scrollWidth` with `clientWidth` at normal text size. With enlarged text, verify each migrated band fits and does not introduce further overflow; record the existing hero overflow separately rather than hiding it or counting the entire page as passing.
- The dev server rebuilt both pages. The observations below are the border-box distances from that check.

Before, at 1240px on `/100-desafios/`: heading → paragraph 28.22px (`--space-s`), paragraph → paragraph 21.84px (`--space-xs`), paragraph → buy button 50.06px (both of those margins), `.ProductSplit` gap 56.45px (`--space-l`), Sidebar gap 42.33px (`--space-m`), support lines 21.84px.

After, at the same width, both pages: heading → paragraph, paragraph → paragraph, and paragraph → button are 28.22px. Split and Sidebar gaps are 42.33px. The support lines are 14.11px (`--space-2xs`). The explanation under the support row is 42.33px (`--space-m`). The buy button stays 267px wide and `align-self: flex-start`. At 320px the same relationships are 21.38px, 32.06px, and 10.69px, which are the fluid tokens at that root size, and `scrollWidth` equals `clientWidth`. At 760px the split is one column with a 36.77px gap; at 800px it is two columns with a 37.23px gap. The grammar lavender heading stays `rgb(25, 28, 31)`, the grid and reverse order stay, and there is no Sidebar. The lavender activities heading stays red, weight 900, line-height ratio 1.5, cover 366px, one `h1`. FAQ summary spacing stays `--space-2xs` when open. With the root font at 200% on a 320px window, the hero still reaches a `scrollWidth` of 490; the migrated bands do not add to that.
