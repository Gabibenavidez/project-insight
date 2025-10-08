import React from 'react';
import Dashboard from './components/PowerBiDashboard';
import ProductList from './components/ProductList';
import SentimentAnalyzer from './components/AIDemo/index.jsx';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/react-query-client.js';
import { CssBaseline, ThemeProvider, createTheme, Tabs, Tab, Box } from '@mui/material';
import { useState } from 'react';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: { default: '#121212', paper: '#1E1E1E' },
    text: { primary: '#fff' },
  },
  typography: {
    fontFamily: 'Inter, Roboto, Arial',
  },
});

function App() {
  const [tab, setTab] = useState(0);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />

        <Box sx={{ bgcolor: '#1E1E1E', p: 2 }}>
          <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)} centered textColor="primary">
            <Tab label="Dashboard" />
            <Tab label="Products" />
            <Tab label="Azure Text Analysis" />
          </Tabs>
        </Box>

        {tab === 0 && <Dashboard />}
        {tab === 1 && <ProductList />}
        {tab === 2 && <SentimentAnalyzer />}
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
