import React, { Component } from 'react';
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
import MenuDrawer from '../MenuDrawer/MenuDrawer';

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
  utopiaLogo: {
    fontFamily: "'Baloo', cursive !important",
    fontSize: '2rem !important',
  },
};

class TopBar extends Component {
  state = {
    displayMenu: false,
  };

  handleDisplayMenu = () => {
    const { displayMenu } = this.state;
    this.setState({ displayMenu: !displayMenu });
  }

  render() {
    const { classes, user } = this.props;
    const { displayMenu } = this.state;

    let userInfo = null;
    let menu = null;
    if (user) {
      userInfo = <Typography>{user.email}</Typography>;
      menu = (
        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
          <MenuIcon onClick={this.handleDisplayMenu} />
        </IconButton>
      );
    } else {
      userInfo = (
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          component={Link}
          to="/signin"
        >
          ACESSAR
        </Button>
      );
    }

    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.topBar}>
          <Toolbar>
            {menu}
            <Typography variant="title" color="inherit" className={`${classes.grow} ${classes.utopiaLogo}`}>
              <FunctionalLink to="/">
                Utopia
              </FunctionalLink>
            </Typography>
            {userInfo}
          </Toolbar>
        </AppBar>
        <MenuDrawer open={displayMenu} ModalProps={{ onBackdropClick: this.handleDisplayMenu }} />
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
    user: state.users.user,
  };
};

export default connect(mapStateToProps)(withStyles(styles)(TopBar));
