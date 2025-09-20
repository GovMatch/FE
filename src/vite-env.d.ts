/// <reference types="vite/client" />

declare global {
  interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string
    readonly VITE_APP_ENV: string
    // 더 많은 환경변수가 있다면 여기에 추가
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
}

export {}