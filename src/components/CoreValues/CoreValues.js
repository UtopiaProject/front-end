import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import PeopleOutlined from '@material-ui/icons/PeopleOutlined';
import MonetizationOnOutlined from '@material-ui/icons/MonetizationOnOutlined';
import PublicOutlined from '@material-ui/icons/PublicOutlined';
import {
  Grid, Paper, Typography,
} from '@material-ui/core';

const styles = theme => ({
  root: {
    overflowX: 'hidden',
  },
  paper: {
    marginTop: '1rem',
    marginRight: '2rem',
    marginLeft: '2rem',
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary,
    textAlign: 'center',
    minHeight: '15rem',
  },
  typography: {
    fontSize: '1rem',
    [theme.breakpoints.up('md')]: {
      fontSize: '1.5rem',
    },
  },
  icon: {
    margin: theme.spacing.unit,
    fontSize: 100,
    color: 'green',
  },
  sectionHeader: {
    fontSize: '2.5rem',
    textAlign: 'center',
    color: 'green',
    [theme.breakpoints.up('md')]: {
      fontSize: '3rem',
    },
  },
});


const CoreValues = (props) => {
  const { classes } = props;
  return (
    <Grid container spacing={24} className={classes.root}>
      <Grid item xs={12}>
        <h2 className={classes.sectionHeader}>Motivação</h2>
      </Grid>
      <Grid item sm={4} xs={12}>
        <Paper className={classes.paper}>
          <PeopleOutlined className={classes.icon} />
          <Typography className={classes.typography}>
            Juntamente da comunidade científica, proponha projetos
            visando a solucionar problemas socioambientais de maneira sustentável
          </Typography>
        </Paper>
      </Grid>
      <Grid item sm={4} xs={12}>
        <Paper className={classes.paper}>
          <MonetizationOnOutlined className={classes.icon} />
          <Typography className={classes.typography}>
            Acesso democrático a investimentos através
            de uma plataforma de crowdfunding aberta a todos
          </Typography>
        </Paper>
      </Grid>
      <Grid item sm={4} xs={12}>
        <Paper className={classes.paper}>
          <PublicOutlined className={classes.icon} />
          <Typography className={classes.typography}>
            Passo a passo fazer do mundo um lugar melhor para
            as futuras gerações, independente de fronteiras
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

CoreValues.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(CoreValues);
