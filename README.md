# Swiss Grid UI Kit for Oracle APEX

The International Typographic Style for Oracle APEX Universal Theme: bold grotesk type on a steady rhythm, strong rules instead of cards and shadows, square corners, black and white with one signal red, and numbers that line up in reports. One CSS file styles every Universal Theme component, in light and dark mode, without changing your pages, templates or template options.

[![Live demo](https://img.shields.io/badge/Live_demo-e30613?style=for-the-badge)](https://oracleapex.com/ords/r/aamirkhanz/plugins/swiss-grid-ui-kit) &nbsp; Sign in as `demo` with the password `Demo`.

![Overview in light mode](screenshots/overview-light.png)

| | |
|---|---|
| **Files** | `swiss-grid.css` (the look), `swiss-grid.js` (optional light/dark switch) |
| **Version** | 1.0.0 |
| **Built for** | Oracle APEX 26.2, Universal Theme with the Iris theme style (tested); other styles are not tested yet |
| **License** | MIT |

## What it styles

Every component of the Universal Theme reference: Alert, Avatar, Badge, Badges List, Breadcrumb, Button, Button Container, Button Group, Calendar, Card Regions, Card Templates, Carousel, Charts, Classic Report, Collapsible, Column Toggle Report, Comments, Content Block, Content Row, Contextual Info, Flexbox Container, Form Field (every item type and label template), Help Text, Hero, Image, Inline Dialog, Interactive Grid, Interactive Report, Links List, List View, Media List, Menu Bar, Menu Popup, Metric Card, Navigation Bar, PL/SQL Dynamic Content, Reflow Report, Region Display Selector, Standard, Static Content, Tabs Container, Timeline, Title Bar and Tree.

It also styles the page shell (header, side navigation, title bar, footer), modal and inline dialogs, drawers, popups, menus, page messages, tooltips, the date picker, Faceted Search, the rich text editor and select lists.

## Install

1. Download `swiss-grid.css` and, for the light/dark switch, `swiss-grid.js` from the [latest release](https://github.com/aamirkhanz/apex-swiss-grid-ui-kit/releases/latest) or from this repository.
2. In App Builder, go to **Shared Components > Static Application Files** and upload both files.
3. Go to **Shared Components > User Interface Attributes** and add:
   - CSS File URLs: `#APP_FILES#swiss-grid.css`
   - JavaScript File URLs: `#APP_FILES#swiss-grid.js`

That's all: every page of the application now uses the kit. Remove the two URLs to go back to plain Universal Theme.

## Dark mode

![Forms in dark mode](screenshots/forms-dark.png)

`swiss-grid.js` switches between light and dark and remembers the choice (localStorage `sw-mode`); until the user chooses, it follows the operating system.

- Add a button or link with the attribute `data-sw-mode-toggle`, or call `swissGrid.toggle()`.
- `swissGrid.setMode( "light" | "dark" | "auto" )` sets a mode; `swissGrid.getMode()` returns the current one.
- `<html>` fires `sw-modechange` with `detail.mode` after a change, for example to redraw charts.

To open each page in the saved mode without a flash, put this snippet in the page template's HTML header, before the CSS:

```html
<script>(function(d){var m;try{m=localStorage.getItem("sw-mode")}catch(e){}
if(m!=="dark"&&m!=="light")m=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";
d.documentElement.classList.add("sw-"+m)})(document);</script>
```

Without the JavaScript, the kit is light; add the class `sw-dark` to `<html>` yourself for dark.

## Make it yours

Override the tokens in your own CSS, loaded after the kit:

```css
:root { --sw-accent: #0047ff; --sw-accent-hover: #0039cc; --sw-accent-text: #0039cc; }
html.sw-dark { --sw-accent: #5c8dff; --sw-accent-text: #8fb0ff; }
```

| Token | What it sets |
|---|---|
| `--sw-text`, `--sw-page` | Ink and paper: text and rules, and the page |
| `--sw-accent`, `--sw-accent-hover`, `--sw-accent-text` | The signal color: hot buttons, focus, the current entry, and accent text |
| `--sw-line` | Hairlines under titles and between rows |
| `--sw-raised`, `--sw-raised-sm` | The rule on top of regions, and the outline of buttons |
| `--sw-inset` | The box of fields |
| `--sw-font` | The font (Helvetica Neue, Helvetica, Inter or Arial) |
| `--sw-radius`, `--sw-radius-sm` | Corner rounding (0 and 2px) |
| `--sw-success`, `--sw-warning`, `--sw-danger`, `--sw-info` | Status colors |

For your own regions, items and HTML, add a CSS class: `sw-rule`, `sw-box`, `sw-inset`, `sw-flat`, `sw-pill` or `sw-accent`.

## Screenshots

| | |
|---|---|
| ![Buttons](screenshots/buttons-light.png) | ![Alerts](screenshots/alerts-light.png) |
| ![Cards in dark mode](screenshots/cards-dark.png) | ![Interactive Report](screenshots/reports-light.png) |
| ![Overview in dark mode](screenshots/overview-dark.png) | ![Charts in dark mode](screenshots/charts-dark.png) |

## Notes

- **No markup changes.** The kit only overrides Universal Theme's CSS variables and styles its components; your templates and template options stay standard.
- **Accessibility.** Text keeps WCAG AA contrast on the surfaces, fields have a clear edge, keyboard focus always shows a ring, and motion is reduced when the user asks for it.
- **Print.** A print stylesheet is built in: printed pages show the content only (no navigation, toolbars or buttons), black on white, with regions kept together.
- **High contrast.** In Windows high contrast mode the kit lets the system colors through and keeps every rule and outline visible.
- **Fonts.** The kit uses Helvetica Neue, Helvetica, Inter or Arial, whichever is installed, and loads no web fonts.
- **Select lists.** In browsers with customizable selects (Chrome and Edge 135 and later) the open list takes the kit's style; other browsers show their native list.
- **Charts.** Chart series keep the colors you set in each chart; the kit styles the region around them.

## License

MIT, see [LICENSE](LICENSE).

## More

Plug-ins and updates for Oracle APEX by [TechRevX](https://www.techrevx.com). More UI kits: [Neumorphism UI Kit](https://github.com/aamirkhanz/apex-neumorphism-ui-kit), [Glassmorphism UI Kit](https://github.com/aamirkhanz/apex-glassmorphism-ui-kit), [Skeuomorphism UI Kit](https://github.com/aamirkhanz/apex-skeuomorphism-ui-kit), [Minimal Pro UI Kit](https://github.com/aamirkhanz/apex-minimal-pro-ui-kit), [Material 3 Expressive UI Kit](https://github.com/aamirkhanz/apex-material-expressive-ui-kit), [Claymorphism UI Kit](https://github.com/aamirkhanz/apex-claymorphism-ui-kit), [Liquid Glass UI Kit](https://github.com/aamirkhanz/apex-liquid-glass-ui-kit).
