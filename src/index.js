import React from 'react';
import ReactDOM from 'react-dom/client';
import Layout from './Layout';
import { theme } from "./theme";

import { AuthProvider } from './components/AuthContext';
import { ThemeProvider } from '@mui/material';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <AuthProvider>
      <Layout />
    </AuthProvider>
  </ThemeProvider>
);

