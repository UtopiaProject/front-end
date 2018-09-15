import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
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
  render() {
    const { classes, user } = this.props;

    let userInfo = null;

    if (user) {
      userInfo = <Typography>{user.email}</Typography>;
    } else {
      userInfo = (
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          component={Link}
          to="/signin"
        >
            SIGN IN
        </Button>
      );
    }

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
            {userInfo}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

TopBar.defaultProps = {
  user: null,
};

TopBar.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(withStyles(styles)(TopBar));
