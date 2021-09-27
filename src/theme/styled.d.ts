import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    fonts?: {
      primary: string
    }
    palette?: {
      primary: string
      secondary: string
      bg: {
        primary: string
        secondary: string
      }
      text: {
        primary: string
        secondary: string
        ternary: string
      }
      error: string
      success: string
    }
    breakpoints?: {
      xs: string
      sm: string
      md: string
      lg: string
      xl: string
      xxl: string
    }
    transition?: string
    shadow?: string
  }
}
