// src/components/Header.js
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import GavelIcon from '@mui/icons-material/Gavel';

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar position="sticky">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <GavelIcon sx={{ mr: 2 }} />
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              fontWeight: 700,
              color: 'white',
              textDecoration: 'none',
              flexGrow: isMobile ? 1 : 0,
            }}
          >
            State Statutes Browser
          </Typography>

          {!isMobile && (
            <Button
              component={RouterLink}
              to="/statutes"
              color="inherit"
            >
              Browse Statutes
            </Button>
          )}

          {/* You can add additional navigation items here */}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;