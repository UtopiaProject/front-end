import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import VideoBanner from '../../components/VideoBanner/VideoBanner';
import CoreValues from '../../components/CoreValues/CoreValues';
import CoreSteps from '../../components/CoreSteps/CoreSteps';
import CoreCategories from '../../components/CoreCategories/CoreCategories';

const styles = () => ({
  root: {
    flexGrow: 1,
  },
  homepage: {
    overflowX: 'hidden',
  },
  sectionHeader: {
    fontSize: '3rem',
    textAlign: 'center',
    color: 'green',
  },
});

const Homepage = (props) => {
  const { classes } = props;

  return (
    <div className={classes.homepage}>
      <Grid container spacing={16}>
        <Grid item xs={12}>
          <VideoBanner />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <CoreValues />
      </Grid>
      <Grid item xs={12}>
        <CoreSteps />
      </Grid>
      <Grid item xs={12}>
        <CoreCategories />
      </Grid>
      <Grid item xs={12}>
        <h2 className={classes.sectionHeader}>Participe da construção de um novo futuro</h2>
      </Grid>
    </div>
  );
};

Homepage.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(Homepage);
