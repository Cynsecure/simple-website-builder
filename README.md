# Build and pack

npm run build
npm pack

# Chai Builder - Open Source Tailwind Builder

Chai Builder is an Open Source Low Code React + Tailwind CSS Visual Builder.
It allows you to create web pages visually by dragging and dropping elements onto the canvas.
It is a simple React component that renders a full-fledged visual builder into any React application.

Demo: https://chaibuilder-sdk.vercel.app/

---

### Manual installation:

Step 1: Install the packages

```bash
npm install @chaibuilder/sdk
```

Step 2: Add a custom tailwind config.
Create a new file: `tailwind.chaibuilder.config.ts`. <br /> Pass the path to your source files.

```tsx
import { getChaiBuilderTailwindConfig } from "@chaibuilder/sdk/tailwind";
export default getChaiBuilderTailwindConfig(["./src/**/*.{js,ts,jsx,tsx}"]);
```

Step 3: Create a new `chaibuilder.tailwind.css`

```css
@config "./tailwind.chaibuilder.config.ts";

@tailwind base;
@tailwind components;
@tailwind utilities;
```

Step 4: Add the builder to your page.

```tsx
import "./chaibuilder.tailwind.css";
import "@chaibuilder/sdk/styles";
import { loadWebBlocks } from "@chaibuilder/sdk/web-blocks";
import { ChaiBuilderEditor } from "@chaibuilder/sdk";

loadWebBlocks();

const BuilderFullPage = () => {
  return (
    <ChaiBuilderEditor
      blocks={[{ _type: "Heading", _id: "a", content: "This is a heading", styles: "#styles:,text-3xl font-bold" }]}
      onSave={async ({ blocks, providers, brandingOptions, domElements }) => {
        console.log(blocks, providers, brandingOptions, domElements);
        return true;
      }}
      onImageUpload={async (file: File) => {
        console.log("File Selected: ", file);
        return ""; //url
      }}
    />
  );
};
```

### Render the blocks on your page.

```tsx
export default () => {
  return <RenderChaiBlocks blocks={blocks} />;
};
```

---

## BUILD AND PACK

npm run build
npm pack

Left side panel Outline -> src/core/components/sidepanels/panels/outline/list-tree.tsx
