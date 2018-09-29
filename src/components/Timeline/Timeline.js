import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  CardHeader, CardContent,
  Card, Grid, withStyles,
} from '@material-ui/core';

const styles = theme => ({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
  },
  iconGrid: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    zIndex: 0,
  },
  line: {
    position: 'absolute',
    left: 'calc(50% - 1px)',
    width: '2px',
    height: '100%',
    backgroundColor: theme.palette.grey.A100,
  },
  cardContainer: {
    position: 'relative',
  },
  cardDecoratorLeft: {
    position: 'absolute',
    width: 0,
    height: 0,
    borderTop: '1rem solid transparent',
    borderLeft: `1rem solid ${theme.palette.grey.A100}`,
    borderBottom: '1rem solid transparent',
    top: 'calc(50% - 1rem)',
    left: '100%',
  },
  cardDecoratorRight: {
    position: 'absolute',
    width: 0,
    height: 0,
    borderTop: '1rem solid transparent',
    borderRight: `1rem solid ${theme.palette.grey.A100}`,
    borderBottom: '1rem solid transparent',
    top: 'calc(50% - 1rem)',
    right: '100%',
  },
  cardHeader: {
    fontSize: '1.2rem',
    [theme.breakpoints.up('md')]: {
      fontSize: '2rem',
    },
  },
  cardInfo: {
    fontSize: '1rem',
    [theme.breakpoints.up('md')]: {
      fontSize: '1.5rem',
    },
  },
});

class Timeline extends Component {
  getRows = () => {
    const { classes, events } = this.props;

    return events.map((event, i) => ([
      <Grid item xs={5} key={`left-${event.subheader}`}>
        { i % 2 === 0 && this.getTimelineElement(event, true, i) }
      </Grid>,
      <Grid item xs={2} key={`icon-${event.subheader}`} className={classes.iconGrid}>
        <div className={classes.line} />
        <div className={classes.iconContainer}>
          { event.icon }
        </div>
      </Grid>,
      <Grid item xs={5} key={`right-${event.subheader}`}>
        { i % 2 !== 0 && this.getTimelineElement(event, false, i) }
      </Grid>,
    ])).reduce((res, grid) => [...res, ...grid], []);
  }

  getTimelineElement = (event, isLeft, id) => {
    const { classes } = this.props;

    return (
      <div className={classes.cardContainer}>
        <div className={isLeft ? classes.cardDecoratorLeft : classes.cardDecoratorRight} />
        <Card>
          <CardHeader className={classes.cardHeader} title={`${id + 1}º passo - ${event.subheader}`} />
          <CardContent className={classes.cardInfo}>
            { event.description }
          </CardContent>
        </Card>
      </div>
    );
  }

  render() {
    return (
      <Grid container>
        { this.getRows() }
      </Grid>
    );
  }
}

Timeline.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  events: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(Timeline);
