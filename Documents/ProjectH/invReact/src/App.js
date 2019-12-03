import React from 'react';
import InventoryRouter from './Components/InventoryRouter';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';


import './App.css';

const theme = createMuiTheme({
  palette: {
    primary: {

      main: '#9e9e9e',

      contrastText: '#ffffff',
    },
    secondary: {

      main: '#ac6b36',

      contrastText: '#000000'
    },

   error: { main: '#d50000' }
  },
});


function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <InventoryRouter></InventoryRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
