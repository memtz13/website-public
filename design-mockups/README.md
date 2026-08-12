# Kendo PromptBox — Figma mockup

`kendo-promptbox-component.html` is a self-contained, dependency-free HTML/CSS
recreation of the `kendo-promptbox` example (small / medium / large, each with
a file-select button, speech-to-text button, and a primary-colored send/action
button). It uses plain flexbox layout and inline SVG icons so it imports
cleanly into Figma as editable layers.

## Importing into Figma

1. Install the **html.to.design** plugin in Figma (Community plugins).
2. Open the plugin, choose "Import from URL/file" and point it at
   `kendo-promptbox-component.html` (or paste its contents).
3. The plugin will produce one frame per `.variant-block` (Small / Medium /
   Large), each containing an auto-layout `.promptbox` group with:
   - `promptbox-input` — the placeholder text layer
   - `promptbox-toolbar` → `toolbar-left` — the file-select and
     speech-to-text icon buttons (circular, `icon-button` style)
   - `action-button` — the primary send button
4. Since everything is built with flexbox (`display:flex`, `gap`, `padding`),
   html.to.design maps it to Figma auto-layout frames, so the imported result
   stays fully editable (resize, swap icons, restyle) rather than landing as
   flattened vectors.
5. Optional: convert the three size frames into Figma **variants** of one
   component (`Size=Small/Medium/Large`) to match how the Angular component
   exposes a `size` prop on each sub-button.

## Notes for hand-recreation

If you'd rather build it manually instead of importing:

| Property | Small | Medium | Large |
|---|---|---|---|
| Outer padding | 10/12/8/12 px | 14/14/10/14 px | 18/18/12/18 px |
| Placeholder font size | 13px | 14px | 16px |
| Icon button diameter | 28px | 34px | 42px |
| Icon size | 14px | 16px | 20px |
| Toolbar gap | 6px | 8px | 10px |

Shell: white fill, `#e1e3e8` 1px border, 16px corner radius, subtle shadow
(`0 1px 2px rgba(16,24,40,0.04)`). Icon buttons: `#f3f4f6` fill, `#e5e7eb`
1px border, fully rounded, `#4b5563` icon color. Action button: `#4f46e5`
fill, fully rounded, white icon — this is the `themeColor="primary"` slot.
