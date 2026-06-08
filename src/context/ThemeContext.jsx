import { createContext, useContext } from 'react'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { theme } from '../theme'

const ThemeCtx = createContext({ mode: 'light' })

export function ThemeProvider({ children }) {
  return (
    <ThemeCtx.Provider value={{ mode: 'light' }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeCtx.Provider>
  )
}

export const useThemeMode = () => useContext(ThemeCtx)
