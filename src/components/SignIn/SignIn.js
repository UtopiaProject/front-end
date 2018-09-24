import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import * as actions from '../../store/actions/index';

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    height: '72.9vh',
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: 'white',
    color: 'black',
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit,
  },
  signIn: {
    marginTop: theme.spacing.unit * 3,
    background: 'green',
  },
  signUp: {
    marginTop: theme.spacing.unit * 3,
    background: 'blue',
  },
  error: {
    color: 'red',
  },
});

class SignIn extends Component {
  state = {
    email: '',
    password: '',
  };

  handleChangeEmail = (event) => {
    this.setState({ email: event.target.value });
  };

  handleChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  validateUserInput = (userInfo) => {
    if (userInfo.email === '' || userInfo.password === '') {
      return false;
    }
    return true;
  };

  handleSubmitSignIn = (userInfo, history) => {
    const { onAuthenticate } = this.props;
    const valid = this.validateUserInput(userInfo);
    if (valid) {
      onAuthenticate(userInfo, history);
    }
  };

  handleSubmitSignUp = (userInfo) => {
    const { onSignUp } = this.props;
    const valid = this.validateUserInput(userInfo);
    if (valid) {
      onSignUp(userInfo);
    }
  };

  render() {
    const { classes, error } = this.props;
    const { email, password } = this.state;

    let errorMessage = null;
    if (error) {
      errorMessage = (
        <Typography className={classes.error}>
          Error:
          {error}
        </Typography>
      );
    }

    return (
      <Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockIcon />
            </Avatar>
            <Typography variant="headline">Sign in</Typography>
            {errorMessage}
            <form className={classes.form}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input
                  id="email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={event => this.handleChangeEmail(event)}
                  value={email}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={event => this.handleChangePassword(event)}
                  value={password}
                />
              </FormControl>
              <Button
                fullWidth
                variant="raised"
                color="primary"
                className={classes.signIn}
                onClick={() => this.handleSubmitSignIn({ email, password })}
              >
                Sign in
              </Button>
              <Button
                fullWidth
                variant="raised"
                color="secondary"
                className={classes.signUp}
                onClick={() => this.handleSubmitSignUp({ email, password })}
              >
                Sign up
              </Button>
            </form>
          </Paper>
        </main>
      </Fragment>
    );
  }
}

SignIn.defaultProps = {
  error: null,
};

SignIn.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  error: PropTypes.string,
  onAuthenticate: PropTypes.func.isRequired,
  onSignUp: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    error: state.auth.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthenticate: userData => dispatch(actions.authenticate(userData)),
    onSignUp: userData => dispatch(actions.createUser(userData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignIn));
