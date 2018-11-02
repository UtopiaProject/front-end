import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BeenhereOutlined from '@material-ui/icons/BeenhereOutlined';
import {
  Paper,
  Avatar,
  Typography,
  Button,
  withStyles,
  Grid,
  List,
  ListItem,
  ListItemText,
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
    projectForm: {
      title: {
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
    const { projectForm } = this.state;
    const updatedFormElement = updateObject(projectForm[inputIdentifier], {
      value: event.target.value,
      valid: checkValidity(event.target.value, projectForm[inputIdentifier].validation),
      touched: true,
    });

    const updatedProjectForm = updateObject(projectForm, {
      [inputIdentifier]: updatedFormElement,
    });

    let formIsValid = true;
    Object.keys(updatedProjectForm).forEach((input) => {
      formIsValid = updatedProjectForm[input].valid && formIsValid;
    });

    this.setState({ projectForm: updatedProjectForm, formIsValid });
  };

  projectCreationHandler = () => {
    const { projectForm, formIsValid } = this.state;
    const { onRegisterPorject, user } = this.props;
    const projectInfo = {};
    Object.keys(projectForm).forEach((key) => {
      projectInfo[key] = projectForm[key].value;
    });
    projectInfo.author = user.email;
    projectInfo.createdAt = new Date();
    projectInfo.picture = '';
    if (formIsValid) onRegisterPorject(projectInfo);
  };

  render() {
    const { classes } = this.props;
    const { projectForm, errors, formIsValid } = this.state;
    const formElements = Object.keys(projectForm).map(e => ({
      id: e,
      config: projectForm[e],
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
                  onClick={() => this.projectCreationHandler()}
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
  user: PropTypes.shape({}).isRequired,
  classes: PropTypes.shape({}).isRequired,
  onRegisterPorject: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRegisterPorject: projectData => dispatch(actions.createProject(projectData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(ProjectRegistration));
