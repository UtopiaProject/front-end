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
import {
  updateObject,
  checkValidity,
} from '../../../helpers/Validation/Validation';
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

class ProjectForm extends Component {
  state = {
    projectForm: {
      title: {
        elementType: 'text',
        elementConfig: {
          type: 'text',
          label: 'Título do projeto',
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
      picture: {
        elementType: 'text',
        elementConfig: {
          type: 'text',
          label: 'URL da foto do projeto',
        },
        value: '',
        validation: {
          required: false,
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

  componentDidMount() {
    const {
      match: { params: { id } },
      onLoadExistingProject,
    } = this.props;

    if (id) onLoadExistingProject(id);
  }

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

  handleSaveProject = () => {
    const { projectForm, formIsValid } = this.state;
    const {
      user,
      project,
      onCreateProject,
      onUpdateProject,
    } = this.props;

    const projectInfo = {};
    Object.keys(projectForm).forEach((key) => {
      projectInfo[key] = projectForm[key].value;
    });
    projectInfo.author = user.email;
    projectInfo.createdAt = new Date().toLocaleString();

    // If there's a loaded project, update it
    if (project && formIsValid) {
      projectInfo.id = project.id;
      onUpdateProject(projectInfo);
      return;
    }
    if (formIsValid) onCreateProject(projectInfo);
  };

  render() {
    const { classes, project, serverError } = this.props;
    const { projectForm, errors, formIsValid } = this.state;

    const formElements = Object.keys(projectForm).map((e) => {
      const formElementIsEmpty = projectForm[e].value.length === 0;
      if (project && formElementIsEmpty) {
        projectForm[e].value = project[e];
        projectForm[e].valid = true;
      }
      return {
        id: e,
        config: projectForm[e],
      };
    });

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
    let serverErrorFound;
    if (serverError) {
      serverErrorFound = (
        <List>
          <ListItem>
            <ListItemText>
              <Typography align="center">
                {serverError}
              </Typography>
            </ListItemText>
          </ListItem>
        </List>
      );
    }

    const formTitle = project ? 'Editar Projeto' : 'Cadastrar Projeto';
    const formButton = project ? 'ATUALIZAR' : 'CADASTRAR';
    return (
      <Fragment>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <BeenhereOutlined />
            </Avatar>
            <Typography variant="headline">
              {formTitle}
            </Typography>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                {errorsList}
                {serverErrorFound}
              </Grid>
            </Grid>
            <Grid container spacing={24}>
              {form}
              <Grid item xs={12}>
                <Button
                  disabled={!formIsValid}
                  variant="contained"
                  color="primary"
                  onClick={() => this.handleSaveProject()}
                  fullWidth
                >
                  {formButton}
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </main>
      </Fragment>
    );
  }
}

ProjectForm.defaultProps = {
  user: null,
  project: null,
  serverError: null,
  match: null,
};

ProjectForm.propTypes = {
  user: PropTypes.shape({}),
  project: PropTypes.shape({}),
  serverError: PropTypes.shape({}),
  match: PropTypes.shape({}),
  classes: PropTypes.shape({}).isRequired,
  onUpdateProject: PropTypes.func.isRequired,
  onCreateProject: PropTypes.func.isRequired,
  onLoadExistingProject: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    project: state.projects.project,
    serverError: state.projects.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateProject: projectData => dispatch(actions.updateProject(projectData)),
    onCreateProject: projectData => dispatch(actions.createProject(projectData)),
    onLoadExistingProject: id => dispatch(actions.fetchProject(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(ProjectForm));
