declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test'
    readonly NEXT_PUBLIC_GOOGLE_MAP_API_KEY: string
    readonly GOOGLE_MAP_API_KEY_FOR_SERVER: string
  }
}
