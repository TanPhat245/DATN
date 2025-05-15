//import các thư viện, các file
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { WebContextProvider } from "./context/WebContext.jsx";
import { ClerkProvider } from '@clerk/clerk-react'

//import key của clerk
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
    <BrowserRouter>
      <WebContextProvider>
        <App />
      </WebContextProvider>
    </BrowserRouter>
  </ClerkProvider>,
);
