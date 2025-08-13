import React from 'react';
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import InventoryIcon from '@mui/icons-material/Inventory';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import BarChartIcon from '@mui/icons-material/BarChart';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import ReceiptIcon from '@mui/icons-material/Receipt';

const menuItems = [
  { label: 'Productos', icon: <InventoryIcon />, path: '/productos' },
  { label: 'Ventas', icon: <PointOfSaleIcon />, path: '/ventas' },
  { label: 'Reportes', icon: <BarChartIcon />, path: '/reportes' },
  { label: 'Cambios de Estado', icon: <ChangeCircleIcon />, path: '/cambio-estado' },
  { label: 'Combos', icon: <ReceiptIcon />, path: '/combos' }
];

const SidebarNav = ({ open, toggleOpen }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    sessionStorage.clear();
    window.location.replace('/');
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? 200 : 60,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? 200 : 60,
          boxSizing: 'border-box',
          backgroundColor: '#fdeef4',
          transition: 'width 0.3s ease',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        },
      }}
    >
      {/* Parte superior: toggle + navegación */}
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 1 }}>
          <IconButton onClick={toggleOpen}>
            <CompareArrowsIcon sx={{ color: '#e91e63' }} />
          </IconButton>
        </Box>

        <List>
          {menuItems.map((item, index) => (
            <Tooltip title={open ? '' : item.label} placement="right" key={index}>
              <ListItem
                button
                sx={{ px: 2, mb: 4 }}
                onClick={() => navigate(item.path)}
              >
                <ListItemIcon sx={{ color: '#e91e63', minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                {open && (
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontWeight: 'bold',
                      fontSize: '0.95rem',
                      color: '#333',
                    }}
                  />
                )}
              </ListItem>
            </Tooltip>
          ))}
        </List>
      </Box>

      {}
      <Box sx={{ p: 2 }}>
        <Divider sx={{ mb: 1 }} />
        <Tooltip title={open ? '' : 'Cerrar Sesión'} placement="right">
          <ListItem
            button
            sx={{ px: 2, mb: 1 }}
            onClick={handleLogout}
          >
            <ListItemIcon sx={{ color: '#e91e63', minWidth: 40 }}>
              <LogoutIcon />
            </ListItemIcon>
            {open && (
              <ListItemText
                primary="Cerrar Sesión"
                primaryTypographyProps={{
                  fontWeight: 700,
                  fontSize: '1rem',
                  color: '#333',
                }}
              />
            )}
          </ListItem>
        </Tooltip>
      </Box>
    </Drawer>
  );
};

export default SidebarNav;
