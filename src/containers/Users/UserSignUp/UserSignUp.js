import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GroupAddOutlined from '@material-ui/icons/GroupAddOutlined';
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

class UserSignUp extends Component {
  state = {
    userForm: {
      name: {
        elementType: 'text',
        elementConfig: {
          type: 'text',
          label: 'Nome',
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
      email: {
        elementType: 'text',
        elementConfig: {
          type: 'text',
          label: 'Email',
        },
        value: '',
        validation: {
          required: true,
          isEmail: true,
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
      emailConfirmation: {
        elementType: 'text',
        elementConfig: {
          type: 'text',
          label: 'Confirmação de email',
        },
        value: '',
        validation: {
          required: true,
          isEmail: true,
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
      birthdate: {
        elementType: 'date',
        elementConfig: {
          type: 'date',
          label: 'Data de nascimento',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        gridSizing: {
          xs: 12,
          sm: 6,
          md: false,
          lg: false,
          xl: false,
        },
      },
      gender: {
        elementType: 'select',
        elementConfig: {
          label: 'Gênero',
          options: [
            { label: 'Feminino', value: 'Feminino' },
            { label: 'Masculino', value: 'Masculino' },
            { label: 'Outro', value: 'Outro' },
          ],
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        gridSizing: {
          xs: 12,
          sm: 6,
          md: false,
          lg: false,
          xl: false,
        },
      },
      type: {
        elementType: 'select',
        elementConfig: {
          label: 'Tipo de usuário',
          options: [
            { label: 'Contribuinte', value: 'Contribuinte' },
            { label: 'Especialista', value: 'Especialista' },
            { label: 'ONG', value: 'ONG' },
          ],
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        gridSizing: {
          xs: 12,
          sm: 6,
          md: false,
          lg: false,
          xl: false,
        },
      },
      linkedin: {
        elementType: 'text',
        elementConfig: {
          type: 'text',
          label: 'Linkedin',
        },
        value: '',
        validation: {},
        valid: true,
        touched: false,
        gridSizing: {
          xs: 12,
          sm: false,
          md: false,
          lg: false,
          xl: false,
        },
      },
      lattes: {
        elementType: 'text',
        elementConfig: {
          type: 'text',
          label: 'Lattes',
        },
        value: '',
        validation: {},
        valid: true,
        touched: false,
        gridSizing: {
          xs: 12,
          sm: false,
          md: false,
          lg: false,
          xl: false,
        },
      },
      stackOverflow: {
        elementType: 'text',
        elementConfig: {
          type: 'text',
          label: 'StackOverflow',
        },
        value: '',
        validation: {},
        valid: true,
        touched: false,
        gridSizing: {
          xs: 12,
          sm: false,
          md: false,
          lg: false,
          xl: false,
        },
      },
      summary: {
        elementType: 'textarea',
        elementConfig: {
          type: 'text',
          label: 'Sumário',
          rows: '4',
          maxRows: '4',
        },
        value: '',
        validation: {},
        valid: true,
        touched: false,
        gridSizing: {
          xs: 12,
          sm: false,
          md: false,
          lg: false,
          xl: false,
        },
      },
      password: {
        elementType: 'password',
        elementConfig: {
          type: 'password',
          label: 'Senha',
        },
        value: '',
        validation: {
          required: true,
          minLength: 8,
        },
        valid: false,
        touched: false,
        gridSizing: {
          xs: 12,
          sm: 6,
          md: false,
          lg: false,
          xl: false,
        },
      },
      passwordConfirmation: {
        elementType: 'password',
        elementConfig: {
          type: 'password',
          label: 'Confirmação de senha',
        },
        value: '',
        validation: {
          required: true,
          minLength: 8,
        },
        valid: false,
        touched: false,
        gridSizing: {
          xs: 12,
          sm: 6,
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
      messages.push('emails não coincidem');
    }
    if (userInfo.password !== userInfo.passwordConfirmation) {
      messages.push('senhas não coincidem');
    }
    if (messages.length) {
      this.setState({ errors: messages });
      return false;
    }
    return true;
  }

  userCreationHandler = () => {
    const { userForm, formIsValid } = this.state;
    const { onSignUp } = this.props;
    const userInfo = {};
    Object.keys(userForm).forEach((key) => {
      userInfo[key] = userForm[key].value;
    });
    const validUser = this.validUser(userInfo);
    if (formIsValid && validUser) {
      onSignUp(userInfo);
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
              <GroupAddOutlined />
            </Avatar>
            <Typography variant="headline">Cadastrar Usuário</Typography>
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

UserSignUp.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  onSignUp: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    serverError: state.users.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSignUp: userData => dispatch(actions.createUser(userData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UserSignUp));
