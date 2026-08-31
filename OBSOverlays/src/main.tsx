import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: "light", 
    background:{
      default: "#F1F1F1",
      paper: "#f8f8f8",
    },
    primary: {
      main: "#1B1B1B",
    },
    secondary: {
      main: "#F97FAA" 
    },
    info:{
      main: "#2899F7"
    }},
    typography:{
    allVariants:{
      fontFamily: "Outfit, sans-serif"
    },
  }
});


createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={theme}>
      <StrictMode>
          <App />
      </StrictMode>
    </ThemeProvider>
);
