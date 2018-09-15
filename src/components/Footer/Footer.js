import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const styles = () => ({
  footer: {
    height: '10rem',
    background: 'black',
  },
});

const Footer = (props) => {
  const { classes } = props;

  return (
    <Grid container spacing={16}>
      <Grid item xs={12}>
        <div className={classes.footer} />
      </Grid>
    </Grid>
  );
};

Footer.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(Footer);
