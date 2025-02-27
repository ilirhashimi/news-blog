import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { useContext } from 'react';
import { NewsContext } from '../../contexts/news/news';

import logo from '../../assets/logo.png';

export const Navigation = () => {
  const { openFilter } = useContext(NewsContext);
  return (
    <Box sx={{ flexGrow: 1, position: 'sticky', top: 0, zIndex: 999 }}>
      <AppBar position="static">
        <Toolbar className="flex flex-row">
          <Box sx={{ flexGrow: 0 }}>
            <img src={logo} height={40} width={40} />
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={openFilter}
            >
              <SettingsIcon />
            </IconButton>
            <Typography variant="h6" component="div">
              Filters
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
