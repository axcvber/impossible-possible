import React, { ReactChild } from 'react'
import { ToastContainer } from 'react-toastify'
import { ThemeProvider } from 'styled-components'
import { ThemeContext } from '../hooks/ThemeStore'
import { darkTheme, lightTheme } from './default'
import { GlobalStyles } from './global'
interface ITheme {
  children: ReactChild
}

const Theme: React.FC<ITheme> = ({ children }) => {
  const { theme } = React.useContext(ThemeContext)
  const themeMode = theme === 'light' ? lightTheme : darkTheme
  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyles />
      <ToastContainer position='bottom-left' closeOnClick={false} pauseOnHover={false} limit={1} />
      {children}
    </ThemeProvider>
  )
}

export default Theme
