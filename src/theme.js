import { createTheme } from '@mui/material/styles'

const tokens = {
  primary: '#0F4C81', // Royal Blue primary
  primaryLight: '#2563EB', // Vibrant Blue
  primaryDark: '#0B2D4D', // Deep Navy Blue
  secondary: '#0B0F19', // Dark Slate/Black
  accent: '#FF6D00', // Vibrant Orange
  bg: '#f8fafc', // Slate tint background
  bgCard: 'rgba(255, 255, 255, 0.82)',
  textMain: '#334155',
  textDark: '#0f172a',
  textLight: '#64748b',
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
