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
    navigate('/', { replace: true });
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
          backgroundColor: '#172b3dff',
          transition: 'width 0.3s ease',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        },
      }}
    >
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 1 }}>
          <IconButton onClick={toggleOpen}>
            <CompareArrowsIcon sx={{ color: '#ffffffff' }} />
          </IconButton>
        </Box>

        <List>
          {menuItems.map((item, index) => (
            <Tooltip title={open ? '' : item.label} placement="right" key={index}>
              <ListItem
                sx={{ px: 2, mb: 4, cursor: 'pointer' }}
                onClick={() => navigate(item.path)}
              >
                <ListItemIcon sx={{ color: '#ffffffff', minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                {open && (
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontWeight: 'bold',
                      fontSize: '0.95rem',
                      color: '#ffffffff',
                    }}
                  />
                )}
              </ListItem>
            </Tooltip>
          ))}
        </List>
      </Box>

      <Box sx={{ p: 2 }}>
        <Divider sx={{ mb: 1 }} />
        <Tooltip title={open ? '' : 'Cerrar Sesión'} placement="right">
          <ListItem
            sx={{ px: 2, mb: 1, cursor: 'pointer' }}
            onClick={handleLogout}
          >
            <ListItemIcon sx={{ color: '#ffffffff', minWidth: 40 }}>
              <LogoutIcon />
            </ListItemIcon>
            {open && (
              <ListItemText
                primary="Cerrar Sesión"
                primaryTypographyProps={{
                  fontWeight: 700,
                  fontSize: '1rem',
                  color: '#ffffffff',
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
