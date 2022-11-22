import React from 'react';
import FreeChat from "./containers/FreeChat/FreeChat";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <FreeChat/>
    </ThemeProvider>
  );
}

export default App;
