import React from 'react'

export function useDarkMode() {
  const [theme, setTheme] = React.useState<string>('light')
  const [mountedComponent, setMountedComponent] = React.useState<boolean>(false)
  const setMode = (mode: string) => {
    window.localStorage.setItem('theme', mode)
    setTheme(mode)
  }
  const themeToggler = () => {
    theme === 'light' ? setMode('dark') : setMode('light')
  }
  React.useEffect(() => {
    const localTheme: string | null = window.localStorage.getItem('theme')
    localTheme ? setTheme(localTheme) : setMode('light')
    setMountedComponent(true)
  }, [])
  return [theme, themeToggler, mountedComponent]
}
