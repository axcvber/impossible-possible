import { createGlobalStyle } from 'styled-components'
import normalize from 'styled-normalize'

export const GlobalStyles = createGlobalStyle`
${normalize}

* {
  -webkit-tap-highlight-color: transparent;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

*::after,
*::before {
  box-sizing: border-box;
}

::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  background-color: ${({ theme }) => theme.palette?.bg.secondary};

  box-shadow: 0 0 2px rgba(0, 0, 0, 0.1) inset;
}

::-webkit-scrollbar-thumb {
  background-color: ${({ theme }) => theme.palette?.primary};
  border-radius: 8px;
  border: 3.5px solid ${({ theme }) => theme.palette?.bg.secondary};
}


body { 
  font-family: ${({ theme }) => theme.fonts?.primary};
  font-size: 16px;
  line-height: 1;
  background-color: ${({ theme }) => theme.palette?.bg.primary};
  transition: all ${({ theme }) => theme.transition}
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
h1,h2,h3,h4,h5,h6 {
  margin: 0;
}
a {
  text-decoration: none;
}
`
