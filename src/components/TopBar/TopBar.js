import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import FunctionalLink from '../../helpers/Router/FunctionalLink/FunctionalLink';
import cssClasses from './TopBar.css';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  topBar: {
    background: 'white',
    color: 'black',
  },
  button: {
    background: 'green',
  },
};

class TopBar extends React.Component {
  state = {
    auth: true,
  };

  handleChange = (event) => {
    this.setState({ auth: event.target.checked });
  };

  render() {
    const { classes } = this.props;
    const { auth } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.topBar}>
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className={`${classes.grow} ${cssClasses.utopiaLogo}`}>
              <FunctionalLink to="/">
                Utopia
              </FunctionalLink>
            </Typography>
            {auth && (
              <Button variant="contained" color="primary" className={classes.button}>
                <FunctionalLink to="/signin">
                  SIGN IN
                </FunctionalLink>
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

TopBar.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(TopBar);
