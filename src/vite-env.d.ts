
interface ImportMetaEnv {
  readonly VITE_GNEWS_API_KEY: string;
  readonly VITE_EXCHANGE_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "*.mp4";
