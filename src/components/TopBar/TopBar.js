import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
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
              Utopia
            </Typography>
            {auth && (
              <div>
                Filipe
              </div>
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
