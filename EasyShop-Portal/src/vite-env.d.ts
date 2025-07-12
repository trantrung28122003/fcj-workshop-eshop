/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_COGNITO_REGION: string;
  readonly VITE_COGNITO_CLIENT_ID: string;
  readonly VITE_BASE_URL:string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
