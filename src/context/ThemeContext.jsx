import { createContext, useContext } from 'react'

const ThemeCtx = createContext({ mode: 'light' })

export function ThemeProvider({ children }) {
  return <ThemeCtx.Provider value={{ mode: 'light' }}>{children}</ThemeCtx.Provider>
}

export const useThemeMode = () => useContext(ThemeCtx)
