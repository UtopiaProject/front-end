import React from 'react';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const MenuDrawer = (props) => {
  const { open, ModalProps } = props;
  const menuItems = [
    { title: 'Projetos', path: '/projects' },
    { title: 'Usuários', path: '/users' },
  ];
  return (
    <Drawer open={open} ModalProps={ModalProps}>
      <List>
        { menuItems.map(item => (
          <ListItem key={item.title}>
            <Button component={Link} to={item.path}>
              {item.title}
            </Button>
          </ListItem>
        )) }
      </List>
    </Drawer>
  );
};

MenuDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  ModalProps: PropTypes.shape({}).isRequired,
};

export default MenuDrawer;
