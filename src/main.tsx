
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from './components/ThemeProvider'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || "pk_test_bW9kZXJuLW9yY2EtODQuY2xlcmsuYWNjb3VudHMuZGV2JA";

// Allow the app to run with or without Clerk
const shouldUseClerk = !!PUBLISHABLE_KEY;

if (shouldUseClerk) {
  createRoot(document.getElementById("root")!).render(
    <ThemeProvider>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <App />
      </ClerkProvider>
    </ThemeProvider>
  );
} else {
  // Run without authentication for now
  createRoot(document.getElementById("root")!).render(
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}
