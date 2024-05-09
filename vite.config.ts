import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import viteTsConfigPaths from "vite-tsconfig-paths";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteTsConfigPaths()],
  resolve: {
    alias: {
      "@widgets": path.resolve(__dirname, "./src/widgets/index.ts"),
      "@pages": path.resolve(__dirname, "./src/pages/index.ts"),
      "@features": path.resolve(__dirname, "./src/features"),
      "@utils": path.resolve(__dirname, "./src/utils"),
    },
  },
});
