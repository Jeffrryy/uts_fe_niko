import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Payment, RestaurantMenu, Receipt, Menu } from '@mui/icons-material';
import { IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import image from '../assets/images.jpeg'
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className="flex items-center justify-between p-4 bg-green-500">
        <div className="flex items-center">
          <IconButton onClick={toggleDrawer} className="mr-2">
            <Menu />
          </IconButton>
          <img src={image} className="h-10 w-100 object-cover"/>
        </div>
      </div>
      <Drawer anchor="left" open={isOpen} onClose={toggleDrawer}>
        <List className="w-64 bg-green-500 text-white">
          <ListItem button component={Link} to="/order" onClick={toggleDrawer}>
            <ListItemIcon className="text-white">
              <Receipt />
            </ListItemIcon>
            <ListItemText primary="Order" />
          </ListItem>
          <ListItem button component={Link} to="/shop" onClick={toggleDrawer}>
            <ListItemIcon className="text-white">
              <RestaurantMenu />
            </ListItemIcon>
            <ListItemText primary="Food Item" />
          </ListItem>
          <ListItem button component={Link} to="/listmenu" onClick={toggleDrawer}>
            <ListItemIcon className="text-white">
              <ShoppingCart />
            </ListItemIcon>
            <ListItemText primary="List Menu" />
          </ListItem>
          <ListItem button component={Link} to="/payment" onClick={toggleDrawer}>
            <ListItemIcon className="text-white">
              <Payment />
            </ListItemIcon>
            <ListItemText primary="Payment" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default Navbar;