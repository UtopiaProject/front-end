import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Drawer,
  List,
  Divider,
  Typography,
  TextField,
} from '@material-ui/core';
import CheckboxFilter from './CheckboxFilter/CheckboxFilter';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 440,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar,
});

function ClippedDrawer(props) {
  const { classes, open, ModalProps } = props;
  const steps = [
    { id: 1, title: 'Proposta' },
    { id: 2, title: 'Avaliação' },
    { id: 3, title: 'Prototipação' },
    { id: 4, title: 'Reavaliação' },
    { id: 5, title: 'Produção' },
  ];

  const categories = [
    { id: 1, title: 'Agriculture' },
    { id: 2, title: 'Education' },
    { id: 3, title: 'Food' },
    { id: 4, title: 'Green Energy' },
    { id: 5, title: 'Medicine' },
    { id: 6, title: 'Prosthetics' },
    { id: 7, title: 'Sanitation' },
    { id: 8, title: 'Transport' },
  ];

  return (
    <div className={classes.root}>
      <Drawer
        variant="temporary"
        classes={{
          paper: classes.drawerPaper,
        }}
        open={open}
        ModalProps={ModalProps}
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
          <Typography>Passos</Typography>
          {steps.map(step => <CheckboxFilter key={step.id} title={step.title} />)}
        </List>
        <Divider />
        <List>
          <Typography>Palavras chave</Typography>
          <TextField variant="outlined" placeholder="Busque por palavras-chave" fullWidth />
        </List>
        <Divider />
        <List>
          <Typography>Categorias</Typography>
          {categories.map(cat => <CheckboxFilter key={cat.id} title={cat.title} />)}
        </List>
        <Divider />
      </Drawer>
    </div>
  );
}

ClippedDrawer.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  open: PropTypes.bool.isRequired,
  ModalProps: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(ClippedDrawer);
