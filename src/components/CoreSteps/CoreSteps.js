import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import WbIncandescentOutlined from '@material-ui/icons/WbIncandescentOutlined';
import CommentOutlined from '@material-ui/icons/CommentOutlined';
import AttachMoneyOutlined from '@material-ui/icons/AttachMoneyOutlined';
import Chat from '@material-ui/icons/ChatOutlined';
import StarBorderOutlined from '@material-ui/icons/StarBorderOutlined';
import { Grid, Avatar } from '@material-ui/core';
import Timeline from '../Timeline/Timeline';

const styles = theme => ({
  sectionHeader: {
    fontSize: '2.5rem',
    textAlign: 'center',
    color: 'green',
    [theme.breakpoints.up('md')]: {
      fontSize: '3rem',
    },
  },
  stepText: {
    fontSize: '1rem !important',
    [theme.breakpoints.up('md')]: {
      fontSize: '1.5rem',
    },
  },
});

const CoreSteps = (props) => {
  const { classes } = props;
  const events = [
    {
      subheader: 'proposta',
      description: 'Especialistas propõem projetos sociais e ambientais',
      icon: <Avatar><WbIncandescentOutlined /></Avatar>,
    },
    {
      subheader: 'avaliação',
      description: 'Especialistas discutem a viabilidade do projeto',
      icon: <Avatar><CommentOutlined /></Avatar>,
    },
    {
      subheader: 'prototipação',
      description: 'Aprovado, é feito o crowdfunding da prototipação',
      icon: <Avatar><AttachMoneyOutlined /></Avatar>,
    },
    {
      subheader: 'reavaliação',
      description: 'Resultados do protótipo são rediscutidos',
      icon: <Avatar><Chat /></Avatar>,
    },
    {
      subheader: 'produção',
      description: 'Protótipo vira produto e entra em crowdfunding para produção em massa',
      icon: <Avatar><StarBorderOutlined /></Avatar>,
    },
  ];
  return (
    <Grid container spacing={24}>
      <Grid item xs={12}>
        <h2 className={classes.sectionHeader}>Como funciona</h2>
      </Grid>
      <Grid item xs={12} className={classes.stepText}>
        <Timeline events={events} />
      </Grid>
    </Grid>
  );
};

CoreSteps.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(CoreSteps);
