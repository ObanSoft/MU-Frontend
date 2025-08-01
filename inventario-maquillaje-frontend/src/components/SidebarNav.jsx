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
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import InventoryIcon from '@mui/icons-material/Inventory'; // Productos
import PointOfSaleIcon from '@mui/icons-material/PointOfSale'; // Ventas
import BarChartIcon from '@mui/icons-material/BarChart'; // Reportes
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';

const menuItems = [
  { label: 'Productos', icon: <InventoryIcon />, path: '/productos' },
  { label: 'Ventas', icon: <PointOfSaleIcon />, path: '/ventas' },
  { label: 'Reportes', icon: <BarChartIcon />, path: '/reportes' },
  { label: 'Cambios de Estado', icon: <ChangeCircleIcon />, path: '/cambio-estado' },
];

const SidebarNav = ({ open, toggleOpen }) => {
  const navigate = useNavigate();

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
        },
      }}
    >
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
              sx={{ px: 2, mb: 4.0 }}
              onClick={() => navigate(item.path)} 
            >
              <ListItemIcon
                sx={{
                  color: '#e91e63',
                  minWidth: 40,
                }}
              >
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
    </Drawer>
  );
};

export default SidebarNav;
