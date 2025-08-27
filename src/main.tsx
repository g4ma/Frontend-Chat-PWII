import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { registerPWA } from "./utils/pwa.ts";

registerPWA()

createRoot(document.getElementById("root")!).render(<App />);
