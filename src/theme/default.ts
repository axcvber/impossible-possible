import { DefaultTheme } from 'styled-components'

const theme: DefaultTheme = {
  fonts: {
    primary: "'Exo 2', sans-serif",
  },
  breakpoints: {
    xs: '0',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    xxl: '1400px',
  },
  transition: '0.3s ease-in-out',
  shadow: '0px 0px 8px 0px',
}

const light: DefaultTheme = {
  palette: {
    primary: '#51D6EA',
    secondary: '#51d6ea88',
    bg: {
      primary: '#fafafa',
      secondary: '#fafafa',
    },
    text: {
      primary: '#4F5364',
      secondary: '#656567',
      ternary: '#fff',
    },
    error: '#F14E70',
    success: '#44C4A1',
  },
}

const dark: DefaultTheme = {
  palette: {
    primary: '#8854D0',
    secondary: '#8854d088',
    bg: {
      primary: '#000015',
      secondary: '#131822',
    },
    text: {
      primary: '#DEDEDE',
      secondary: '#DEDEDE',
      ternary: '#000',
    },
    error: '#F14E70',
    success: '#44C4A1',
  },
}

export const lightTheme = { ...theme, ...light }
export const darkTheme = { ...theme, ...dark }
