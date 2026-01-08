/// <reference types="vite/client" />

// Extend Vite's ImportMetaEnv with project-specific VITE_ variables
interface ImportMetaEnv {
  readonly VITE_EMAILJS_SERVICE_ID?: string;
  readonly VITE_EMAILJS_TEMPLATE_ID?: string;
  readonly VITE_EMAILJS_PUBLIC_KEY?: string;
  // readonly VITE_PROFILE_PHOTO?: string;
  // add other `VITE_` env vars here as needed
}
