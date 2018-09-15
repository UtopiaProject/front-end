/* eslint-disable */
// TODO: REMOVE THIS
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const styles = {
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
};

const FunctionalLink = (props) => {
  const { to, children, classes } = props;
  return (
    <Link to={to} className={classes.link}>
      {children}
    </Link>
  );
};

FunctionalLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.string,
  ]),
};

export default withStyles(styles)(FunctionalLink);
