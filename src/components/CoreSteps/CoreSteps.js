import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import WbIncandescentOutlined from '@material-ui/icons/WbIncandescentOutlined';
import CommentOutlined from '@material-ui/icons/CommentOutlined';
import AttachMoneyOutlined from '@material-ui/icons/AttachMoneyOutlined';
import Chat from '@material-ui/icons/ChatOutlined';
import StarBorderOutlined from '@material-ui/icons/StarBorderOutlined';
import { Timeline } from 'react-material-timeline';
import { Grid, Avatar } from '@material-ui/core';

const styles = {
  sectionHeader: {
    fontSize: '3rem',
    textAlign: 'center',
    color: 'green',
  },
};

const CoreSteps = (props) => {
  const { classes } = props;
  const events = [
    {
      title: 'Especialistas propõem projetos sociais e ambientais',
      icon: <Avatar><WbIncandescentOutlined /></Avatar>,
    },
    {
      title: 'Especialistas discutem a viabilidade do projeto',
      icon: <Avatar><CommentOutlined /></Avatar>,
    },
    {
      title: 'Aprovado, é feito o crowdfunding da prototipação',
      icon: <Avatar><AttachMoneyOutlined /></Avatar>,
    },
    {
      title: 'Resultados do protótipo são rediscutidos',
      icon: <Avatar><Chat /></Avatar>,
    },
    {
      title: 'Protótipo vira produto e entra em crowdfunding para produção em massa',
      icon: <Avatar><StarBorderOutlined /></Avatar>,
    },
  ];
  return (
    <Grid container spacing={24}>
      <Grid item xs={12}>
        <h2 className={classes.sectionHeader}>Como funciona</h2>
      </Grid>
      <Grid item xs={12}>
        <Timeline events={events} />
      </Grid>
    </Grid>
  );
};

CoreSteps.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(CoreSteps);
