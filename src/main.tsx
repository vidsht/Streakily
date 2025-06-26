
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import App from './App.tsx'
import './index.css'

const PUBLISHABLE_KEY = import.meta.env.pk_test_cmVuZXdpbmctZ2liYm9uLTg1LmNsZXJrLmFjY291bnRzLmRldiQ

// Allow the app to run with or without Clerk
const shouldUseClerk = !!PUBLISHABLE_KEY;

if (shouldUseClerk) {
  createRoot(document.getElementById("root")!).render(
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <App />
    </ClerkProvider>
  );
} else {
  // Run without authentication for now
  createRoot(document.getElementById("root")!).render(
    <App />
  );
}
