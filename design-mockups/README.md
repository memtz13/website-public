# Kendo PromptBox — Figma mockup

`kendo-promptbox-component.html` is a self-contained, dependency-free HTML/CSS
recreation of the `kendo-promptbox` example (small / medium / large, each with
a file-select button, speech-to-text button, and a primary-colored send/action
button). It uses plain flexbox layout and inline SVG icons so it imports
cleanly into Figma as editable layers.

The file also includes a **States** section with all 9 states the component
can be in, and the send-button state for each:

| # | State | Send button |
|---|---|---|
| 1 | Empty / idle | Disabled |
| 2 | Focused (empty) | Disabled |
| 3 | Ready to send (has text) | Enabled |
| 4 | Attachment attached | Enabled |
| 5 | Recording (speech-to-text) | Disabled |
| 6 | Sending | Disabled (spinner shown) |
| 7 | Streaming response | Repurposed as Stop/Cancel (enabled) |
| 8 | Component disabled | Disabled — all controls locked |
| 9 | Error (validation failure) | Disabled |
| 9b | Upload failed | Disabled |

**How state 9 resolves:** it isn't a dead end — the box re-validates live as
the user acts, with no manual dismiss. Removing the offending chip (or
attaching a valid replacement, or trimming under the char limit) clears the
ring and error text immediately, and typed text is preserved throughout. It
falls back to whichever state actually matches what's left: State 1 (Empty)
if nothing remains, State 3 (Ready to send) if text is still present, or
State 4 (Attachment attached) if a valid file replaced the bad one.

**State 9 vs 9b — two different failure shapes:** state 9 is a **validation**
error (bad file type, over the size/char limit) — instant, client-side, so
the whole box red-rings until the offending content is removed. State 9b is
an **upload** failure (valid file, network drop mid-upload) — that one is
scoped to the individual attachment chip (red chip + "Retry"), not the whole
box, since the rest of the draft was never actually invalid.

**Disable-send rules:**
- Trimmed text is empty **and** there are no attachments.
- A request is already sending or streaming (swap the button to "Stop" during
  streaming rather than just graying it out, so the user keeps a control).
- The mic is actively recording — no finalized transcript exists yet.
- Validation fails: message over the max length, or an attachment is invalid
  (bad type, too large, still uploading).
- The whole component is disabled/readonly (no active session, quota
  exceeded, etc.) — send is locked along with every other control.

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
