import { Navigation } from './components';
import { Box } from '@mui/material';
import { NewsProvider } from './contexts/news/news';
import { SnackbarProvider } from 'notistack';

import { Main } from './api/page/main';

import './App.css';

function App() {
  return (
    <SnackbarProvider
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      maxSnack={3}
      style={{ zIndex: 1300 }}
    >
      <NewsProvider>
        <Box>
          <Navigation />
          <Main />
        </Box>
      </NewsProvider>
    </SnackbarProvider>
  );
}

export default App;
