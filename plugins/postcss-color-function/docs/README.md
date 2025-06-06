<!-- Available Variables: -->
<!-- <humanReadableName> PostCSS Your Plugin -->
<!-- <exportName> postcssYourPlugin -->
<!-- <packageName> @csstools/postcss-your-plugin -->
<!-- <packageVersion> 1.0.0 -->
<!-- <packagePath> plugins/postcss-your-plugin -->
<!-- <cssdbId> your-feature -->
<!-- <specUrl> https://www.w3.org/TR/css-color-4/#funcdef-color -->
<!-- <example.css> file contents for examples/example.css -->
<!-- <header> -->
<!-- <usage> usage instructions -->
<!-- <envSupport> -->
<!-- <corsWarning> -->
<!-- <linkList> -->
<!-- <parallelBuildsNotice> -->
<!-- to generate : npm run docs -->

<header>

[<humanReadableName>] lets you use the `color` function in
CSS, following the [CSS Color] specification.

```css
<example.css>

/* becomes */

<example.expect.css>
```

<usage>

<envSupport>

## Options

### preserve

The `preserve` option determines whether the original notation
is preserved. By default, it is not preserved.

```js
<exportName>({ preserve: true })
```

```css
<example.css>

/* becomes */

<example.preserve-true.expect.css>
```

### enableProgressiveCustomProperties

The `enableProgressiveCustomProperties` option determines whether the original notation
is wrapped with `@supports` when used in Custom Properties. By default, it is enabled.

> [!NOTE]
> We only recommend disabling this when you set `preserve` to `false` or if you bring your own fix for Custom Properties.  
> See what the plugin does in its [README](https://github.com/csstools/postcss-plugins/tree/main/plugins/postcss-progressive-custom-properties#readme).

```js
<exportName>({ enableProgressiveCustomProperties: false })
```

```css
<example.css>

/* becomes */

<example.preserve-true.progressive-false.expect.css>
```

_Custom properties do not fallback to the previous declaration_

## Supported Color Spaces

```css
.color-spaces {
	color: color(a98-rgb 0.803 0.484 0.944);
	color: color(display-p3 0.8434 0.509 0.934);
	color: color(prophoto-rgb 0.759 0.493 0.898);
	color: color(rec2020 0.772 0.491 0.920);
	color: color(srgb 0.897 0.488 0.959);
	color: color(srgb-linear 0.783 0.203 0.910);
	color: color(xyz 0.560 0.377 0.904);
	color: color(xyz-d50 0.550 0.375 0.680);
	color: color(xyz-d65 0.560 0.377 0.904);
}
```

## Copyright : color conversions

This software or document includes material copied from or derived from https://github.com/w3c/csswg-drafts/tree/main/css-color-4. Copyright © 2022 W3C® (MIT, ERCIM, Keio, Beihang).

<linkList>
[CSS Color]: <specUrl>
