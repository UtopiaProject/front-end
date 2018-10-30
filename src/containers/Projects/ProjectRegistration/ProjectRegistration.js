import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BeenhereOutlined from '@material-ui/icons/BeenhereOutlined';
import {
  Paper, Avatar, Typography, Button, withStyles, Grid, List, ListItem, ListItemText,
} from '@material-ui/core';
import { updateObject, checkValidity } from '../../../helpers/Validation/Validation';
import * as actions from '../../../store/actions';
import Input from '../../../components/Input/Input';

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 800,
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

class ProjectRegistration extends Component {
  state = {
    userForm: {
      name: {
        elementType: 'text',
        elementConfig: {
          type: 'text',
          label: 'Nome do projeto',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        gridSizing: {
          xs: 12,
          sm: false,
          md: false,
          lg: false,
          xl: false,
        },
      },
      introduction: {
        elementType: 'textarea',
        elementConfig: {
          type: 'text',
          label: 'Introdução (resumo de sua ideia)',
          rowsMax: '4',
          rows: '4',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        gridSizing: {
          xs: 12,
          sm: false,
          md: false,
          lg: false,
          xl: false,
        },
      },
      description: {
        elementType: 'textarea',
        elementConfig: {
          type: 'text',
          label: 'Descrição (apresentação completa de sua ideia)',
          rowsMax: '10',
          rows: '10',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        gridSizing: {
          xs: 12,
          sm: false,
          md: false,
          lg: false,
          xl: false,
        },
      },
    },
    formIsValid: false,
    errors: [],
  };

  inputChangedHandler = (event, inputIdentifier) => {
    const { userForm } = this.state;
    const updatedFormElement = updateObject(userForm[inputIdentifier], {
      value: event.target.value,
      valid: checkValidity(event.target.value, userForm[inputIdentifier].validation),
      touched: true,
    });

    const updatedUserForm = updateObject(userForm, {
      [inputIdentifier]: updatedFormElement,
    });

    let formIsValid = true;
    Object.keys(updatedUserForm).forEach((input) => {
      formIsValid = updatedUserForm[input].valid && formIsValid;
    });

    this.setState({ userForm: updatedUserForm, formIsValid });
  };

  validUser = (userInfo) => {
    const messages = [];
    if (userInfo.email !== userInfo.emailConfirmation) {
      messages.push('emails não coicidem');
    }
    if (userInfo.password !== userInfo.passwordConfirmation) {
      messages.push('senhas não coicidem');
    }
    if (messages.length) {
      this.setState({ errors: messages });
      return false;
    }
    return true;
  }

  userCreationHandler = () => {
    const { userForm, formIsValid } = this.state;
    const { onRegisterPorject } = this.props;
    const userInfo = {};
    Object.keys(userForm).forEach((key) => {
      userInfo[key] = userForm[key].value;
    });
    const validUser = this.validUser(userInfo);
    if (formIsValid && validUser) {
      onRegisterPorject(userInfo);
    }
  };

  render() {
    const { classes } = this.props;
    const { userForm, errors, formIsValid } = this.state;
    const formElements = Object.keys(userForm).map(e => ({
      id: e,
      config: userForm[e],
    }));

    const form = formElements.map(e => (
      <Input
        key={e.id}
        element={e.config}
        changed={event => this.inputChangedHandler(event, e.id)}
      />
    ));

    let errorsList = null;
    if (errors.length) {
      errorsList = (
        <List>
          {errors.map(error => (
            <ListItem key={error}>
              <ListItemText>
                <Typography align="center">
                  {error}
                </Typography>
              </ListItemText>
            </ListItem>
          ))}
        </List>
      );
    }
    return (
      <Fragment>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <BeenhereOutlined />
            </Avatar>
            <Typography variant="headline">Cadastrar Projeto</Typography>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                {errorsList}
              </Grid>
            </Grid>
            <Grid container spacing={24}>
              {form}
              <Grid item xs={12}>
                <Button
                  disabled={!formIsValid}
                  variant="contained"
                  color="primary"
                  onClick={() => this.userCreationHandler()}
                  fullWidth
                >
                  CADASTRAR
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </main>
      </Fragment>
    );
  }
}

ProjectRegistration.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  onRegisterPorject: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    serverError: state.projects.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRegisterPorject: projectData => dispatch(actions.createUser(projectData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(ProjectRegistration));
