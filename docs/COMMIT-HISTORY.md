# Commit History and Change Guide

This document describes the 66 commits reachable from `main`, in chronological order. It was generated from the Git history and reviewed against the changed paths. The working-tree changes present while this document was written are not part of the history below.

## Change Summary

### New components or blocks

- The initial commit introduced the complete React/Tailwind builder SDK, including the editor, canvas, side panels, settings panels, renderers, web blocks, shadcn UI wrappers, hooks, utility functions, tests, and build configuration.
- `fc2544b` added the layout and position settings panels: [layout-classes.tsx](../src/core/components/settings/new-panel/layout-classes.tsx) and [position-classes.tsx](../src/core/components/settings/new-panel/position-classes.tsx).
- `a67709b` added the `Countdown` web block in [countdown.tsx](../src/web-blocks/countdown.tsx) and exported it from the web-block registry.
- `9bbe201` added the top-panel extension in [top-panel.tsx](../src/core/extensions/top-panel.tsx) and registered the `registerTopPanel` API through the core entry point.
- `3a7159d` added the `Navbar` web block in [navbar.tsx](../src/web-blocks/navbar.tsx) and updated the link block integration.

### New or materially changed functions and APIs

- The initial commit established the public editor, render, runtime, Tailwind, UI, and web-block exports, plus the builder hooks and block utility functions.
- `67441b2` added the `onPreview` editor callback/type wiring.
- `a67709b` and `64a502e` added and then refined countdown registration/rendering and its script-driven update behavior.
- `72f3b09` added handling for `data-editable="false"` so editor actions are disabled for non-editable content. The behavior was partially reverted in `9494027`.
- `41213a7`, `27827f7`, `0ab7de3`, `ef50bf2`, and `32e8add` iterated on save-page/screenshot behavior, CORS handling, declarations, and finally removal of screenshot code.
- `9bbe201` introduced top-panel registration as an extension point.
- `3a7159d` updated link behavior and registered the navbar block.

Most other commits modify existing component styles, layout dimensions, colors, panel state, or package artifacts. They do not introduce a new public component or function.

## Chronological Commit Details

| Date | Commit | What changed | New component/function? |
|---|---|---|---|
| 2025-12-22 | `eaf4715` initial commit | Created the complete Chai Builder SDK/application scaffold: editor, canvas, block system, settings, side panels, render/runtime packages, web blocks, UI wrappers, tests, docs, and build configuration. | Yes. Initial components, hooks, renderers, blocks, and utilities. |
| 2025-12-22 | `c57841e` v1 | Updated dependencies/package metadata, demo top bar, and shadcn button styling; published `0.0.1` archive. | No new public component; existing UI changed. |
| 2025-12-22 | `f38c46a` v2 | Adjusted `ChaiBuilderEditor` and root layout; published `0.0.2` archive. | No. |
| 2025-12-22 | `ff2c122` v3 | Refined root layout and published `0.0.3` archive. | No. |
| 2025-12-22 | `c8a55db` | Fixed add-block menu selection when hovering over an item, including library blocks. | No; behavior fix in existing panels. |
| 2025-12-22 | `2482d2b` | Merged `Cynsecure:main` into `main`. | No direct file changes. |
| 2025-12-22 | `6032354` | Fixed primary button presentation and adjusted add-block dialog/outline tree behavior; updated README usage text. | No new component; existing components changed. |
| 2025-12-22 | `55efd80` | Merged pull request #1 from `KamalBagchi/main`. | No direct file changes. |
| 2025-12-22 | `8634814` v4 | Updated outline tree behavior and published `0.0.4` archive. | No. |
| 2025-12-22 | `d635dae` | Applied design fixes to block placement, manual class settings, and settings panel. | No. |
| 2025-12-22 | `7f05749` v1 | Updated manual class settings, package metadata, and `0.0.1` archive. | No. |
| 2025-12-22 | `cd41cd5` | Updated global `src/index.css` styling. | No. |
| 2025-12-22 | `29c48a8` | Fixed background color for add-block buttons through the tabs UI component. | No. |
| 2025-12-22 | `ecf38ef` v2 | Refined add-block dialog and outline tree behavior; published `0.0.2` archive. | No. |
| 2025-12-22 | `03009bb` | Merged `Cynsecure:main` into `main`. | No direct file changes. |
| 2025-12-22 | `67441b2` | Added `onPreview` editor callback support and demo wiring; updated editor prop types and published `0.0.3`. | Yes. New callback/API wiring. |
| 2025-12-22 | `db83cf8` | Changed tooltip background color. | No. |
| 2025-12-22 | `8d89446` | Merged `Cynsecure:main` into `main`. | No direct file changes. |
| 2025-12-22 | `2852312` | Changed the color used by the add-block-at-bottom control. | No. |
| 2025-12-22 | `b5744fa` | Updated selected colors in the add-block and library panels. | No. |
| 2025-12-22 | `b795077` | Merged pull request #2 from `KamalBagchi/main`. | No direct file changes. |
| 2025-12-22 | `77dbcc1` v4 | Updated package metadata and published `0.0.4` archive. | No. |
| 2025-12-23 | `f1dbadb` | Changed add-block and library panel text color to white. | No. |
| 2025-12-23 | `2efe2b8` | Changed root layout component heights. | No. |
| 2025-12-23 | `3bd35d4` | Merged pull request #3 from `KamalBagchi/main`. | No direct file changes. |
| 2025-12-23 | `1dced34` v1 | Updated package metadata and published another `0.0.1` archive. | No. |
| 2025-12-23 | `e726309` | Adjusted the resizable website content area. | No. |
| 2025-12-23 | `af9596a` | Merged the remote `KamalBagchi/simple-website-builder` branch. | No direct file changes. |
| 2025-12-23 | `ff232b4` | Merged pull request #4 from `KamalBagchi/main`. | No direct file changes. |
| 2025-12-23 | `94180e5` v2 | Updated package metadata and published `0.0.2` archive. | No. |
| 2025-12-23 | `855aeec` | Adjusted content section height in the canvas and root layout. | No. |
| 2025-12-23 | `12ebb6e` | Fixed background colors across demo top bars, canvas top bar, root layout, Tailwind configuration, and switch styling. | No. |
| 2025-12-23 | `d57f3a9` v3 | Updated package metadata and published `0.0.3` archive. | No. |
| 2025-12-23 | `1c5968d` | Merged `Cynsecure:main` into `main`. | No direct file changes. |
| 2025-12-23 | `fc64a9d` | Reverted prior root-layout changes. | No; revert commit. |
| 2025-12-23 | `9985fab` | Reverted root-layout changes again. | No; revert commit. |
| 2025-12-23 | `de4b91a` | Merged pull request #5 from `KamalBagchi/main`. | No direct file changes. |
| 2025-12-23 | `de8d406` v4 | Updated package metadata and published `0.0.4` archive. | No. |
| 2025-12-24 | `fc2544b` | Added layout and position styling groups/panels to the editor settings and updated `Editor.tsx`. | Yes. `LayoutClasses` and `PositionClasses` components. |
| 2025-12-27 | `10f56eb` | Merged pull request #6 from `KamalBagchi/main`. | No direct file changes. |
| 2025-12-29 | `9aeab73` build | Updated package/build metadata and global CSS; published `0.0.1` archive. | No. |
| 2026-01-02 | `a67709b` | Added the countdown web block and exported it from the web-block index. | Yes. `Countdown` component/configuration. |
| 2026-01-02 | `64a502e` | Updated the countdown implementation to use a script-driven timer and integrated it with `Editor.tsx`. | Existing countdown behavior refined; no new public component. |
| 2026-01-02 | `72f3b09` | Made blocks with `data-editable="false"` non-editable by disabling floating actions, canvas actions, and settings. | Yes. New non-editable behavior; no standalone component. |
| 2026-01-02 | `9494027` | Reverted editor changes from the preceding non-editable behavior work. | No; revert commit. |
| 2026-01-02 | `cdf80ee` | Merged pull request #7 from `KamalBagchi/main`. | No direct file changes. |
| 2026-01-02 | `bdcb499` v2 | Updated package metadata and published `0.0.2` archive. | No. |
| 2026-01-05 | `7673089` | Set the add-block menu to open on the Blocks tab by default. | No; existing panel state changed. |
| 2026-01-05 | `d38eca0` | Merged pull request #8 from `KamalBagchi/main`. | No direct file changes. |
| 2026-01-05 | `947375c` v3 | Updated package metadata and published `0.0.3` archive. | No. |
| 2026-01-06 | `41213a7` | Added screenshot-related save-page/editor props and dependency changes; published `0.0.4` archive. | New/changed save-page behavior, but no standalone component. |
| 2026-01-06 | `27827f7` v1 | Continued save-page/screenshot integration in root layout and editor prop types; published `0.0.1` archive. | No standalone component. |
| 2026-01-06 | `0ab7de3` | Fixed a CORS issue in save-page behavior and published `0.0.2` archive. | No. |
| 2026-01-06 | `ef50bf2` v3 | Updated save-page declarations/demo behavior and published `0.0.3` archive. | No. |
| 2026-01-06 | `32e8add` | Removed screenshot code from save-page behavior and editor props; published `0.0.4` archive. | No; removal/revert of earlier behavior. |
| 2026-01-07 | `9bbe201` | Added top-panel extension support and registered it through the core main entry point; updated declarations/package metadata. | Yes. `TopPanel` extension and `registerTopPanel`. |
| 2026-01-07 | `55ffacb` | Updated the `simple-website-builder-0.0.1.tgz` package archive. | No source change. |
| 2026-01-07 | `3a7159d` | Fixed link handling and added the navbar web block/export. | Yes. `Navbar` block; link behavior updated. |
| 2026-01-08 | `cdfe9b8` | Merged pull request #9 from `KamalBagchi/main`. | No direct file changes. |
| 2026-01-08 | `a19b27f` | Updated `Editor.tsx` integration after the navbar/link changes. | No new public component. |
| 2026-01-08 | `ecf4565` | Updated build/package output for v2. | No source feature. |
| 2026-01-08 | `c2de0fc` | Fixed link `href` handling. | No new function; existing link behavior fixed. |
| 2026-01-08 | `55a6eb5` | Updated the `simple-website-builder-0.0.3.tgz` package archive. | No source change. |
| 2026-01-08 | `49db4f3` v4 | Updated package metadata and release state. | No source feature. |
| 2026-09-19 | `27b5fd1` | Updated README build/pack instructions and usage notes. | No. Documentation only. |
| 2026-09-20 | `0f36d03` | Updated package metadata. | No source feature. |

## Notes on Interpreting the History

- Commits named `v1` through `v4`, `build`, or `Update ...tgz` primarily package and publish artifacts. They may contain a small source adjustment, but they are not inherently feature commits.
- Merge commits are retained in the table for a complete audit trail. Most have no direct file changes because their changes are represented by the commits they merge.
- Revert commits are also retained because they explain why a feature may appear briefly in history but not in the final state of `main`.
- The initial commit is unusually large and contains the original product surface, so later commits mostly refine existing components rather than create new ones.
