import React, { ReactChild } from 'react'
import { useDarkMode } from './useDarkMode'

interface IContext {
  theme: any
  themeToggler: any
  mountedComponent: any
}

const ThemeContext = React.createContext<Partial<IContext>>({})

const ThemeStore: React.FC<{ children: ReactChild }> = ({ children }) => {
  const [theme, themeToggler, mountedComponent] = useDarkMode()
  if (!mountedComponent) return null

  return <ThemeContext.Provider value={{ themeToggler, theme, mountedComponent }}>{children}</ThemeContext.Provider>
}

export { ThemeStore, ThemeContext }
