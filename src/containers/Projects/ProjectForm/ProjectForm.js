import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CurrencyCodes from 'currency-codes';
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
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import { updateObject, checkValidity } from '../../../helpers/Validation/Validation';
import ProjectStep, { StepDescription } from '../ProjectStep/ProjectStep';
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
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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
      currency: {
        elementType: 'select',
        elementConfig: {
          label: 'Moeda',
          options: CurrencyCodes.codes().map(code => ({ value: code, label: code })),
        },
        value: 'USD',
        validation: {},
        valid: true,
        touched: false,
        gridSizing: {
          xs: 2,
          sm: false,
          md: false,
          lg: false,
          xl: false,
        },
      },
      fundingTarget: {
        elementType: 'number',
        elementConfig: {
          type: 'number',
          label: 'Financiamento esperado',
        },
        value: 0,
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        gridSizing: {
          xs: 10,
          sm: false,
          md: false,
          lg: false,
          xl: false,
        },
      },
    },
    agree: false,
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

  handleChange = name => (event) => {
    this.setState({ [name]: event.target.checked });
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const { projectForm, agree } = this.state;
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
    formIsValid = agree;

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
    projectInfo.fundingTarget = parseInt(projectForm.fundingTarget.value, 10) * 100;
    projectInfo.currentStep = 2;
    // If there's a loaded project, update it
    if (project && formIsValid) {
      projectInfo.id = project.id;
      projectInfo.currentStep = project.currentStep;
      onUpdateProject(projectInfo);
      return;
    }
    projectInfo.currentFunding = 0;
    if (formIsValid) onCreateProject(projectInfo);
  };

  render() {
    const { classes, project, serverError } = this.props;
    const {
      projectForm,
      errors,
      formIsValid,
      agree,
    } = this.state;

    // Fill in form with project's information, if present (editing).
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

    const formTitle = project ? 'Editar Projeto' : 'Propor Projeto';
    const formButton = project ? 'ATUALIZAR' : 'PROPOR';
    const projectStep = project ? project.currentStep : 1;
    return (
      <Fragment>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Grid container spacing={32}>
              <Grid item xs={12} className={classes.header}>
                <Avatar className={classes.avatar}>
                  <BeenhereOutlined />
                </Avatar>
                <Typography variant="headline">
                  {formTitle}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <StepDescription currentStep={projectStep} />
                <ProjectStep currentStep={projectStep} />
                {errorsList}
                {serverErrorFound}
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={24}>
                  {form}
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={(
                    <Checkbox
                      checked={agree}
                      onChange={this.handleChange('agree')}
                      value="agree"
                      color="primary"
                    />
                  )}
                  label="Concordo que meu projeto terá licença open source CC0"
                />
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  <a href="https://choosealicense.com/licenses/cc0-1.0/">Termos da licença Creative Commons v1.0</a>
                </Typography>
              </Grid>
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
