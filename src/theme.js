import { createTheme } from '@mui/material/styles'

const tokens = {
  primary: '#09524B', // Teal primary
  primaryLight: '#1ab19e',
  primaryDark: '#05312d',
  secondary: '#0F141F', // Dark navy
  accent: '#F25A1A', // Accent orange
  bg: '#f8fbfb', // Pale background
  bgCard: 'rgba(255, 255, 255, 0.82)',
  textMain: '#3d5360',
  textDark: '#0d1f2d',
  textLight: '#6b8590',
  success: '#1b8045',
}

export const theme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: tokens.bg,
      paper: tokens.bgCard,
    },
    text: {
      primary: tokens.textDark,
      secondary: tokens.textMain,
      disabled: tokens.textLight,
    },
    primary: {
      main: tokens.primary,
      light: tokens.primaryLight,
      dark: tokens.primaryDark,
    },
    secondary: {
      main: tokens.secondary,
    },
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif',
    h1: {
      fontFamily: '"Outfit", sans-serif',
      fontWeight: 700,
    },
    h2: {
      fontFamily: '"Outfit", sans-serif',
      fontWeight: 700,
    },
    h3: {
      fontFamily: '"Outfit", sans-serif',
      fontWeight: 600,
    },
    h4: {
      fontFamily: '"Outfit", sans-serif',
      fontWeight: 600,
    },
    h5: {
      fontFamily: '"Outfit", sans-serif',
      fontWeight: 600,
    },
    h6: {
      fontFamily: '"Outfit", sans-serif',
      fontWeight: 600,
    },
    body1: {
      fontFamily: '"Plus Jakarta Sans", sans-serif',
      lineHeight: 1.6,
    },
    body2: {
      fontFamily: '"Plus Jakarta Sans", sans-serif',
      lineHeight: 1.5,
    },
  },
  shape: {
    borderRadius: 16, // Matching radius-md
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 30,
          fontFamily: '"Outfit", sans-serif',
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  },
})
