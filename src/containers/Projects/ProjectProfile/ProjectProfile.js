import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CurrencyCodes from 'currency-codes';
import { Link } from 'react-router-dom';
import {
  Paper,
  Typography,
  withStyles,
  Grid,
  Button,
  AppBar,
  Tabs,
  Tab,
} from '@material-ui/core';
import VerticalMenu from '../../../components/VerticalMenu/VerticalMenu';
import WrapperModal from '../../../components/Modal/WrapperModal';
import Input from '../../../components/Input/Input';
import ProjectNews from '../ProjectNews/ProjectNews';
import ProjectDiscoveries from '../ProjectDiscoveries/ProjectDiscoveries';
import ProjectReferences from '../ProjectReferences/ProjectReferences';
import ProjectFeedback from '../ProjectFeedback/ProjectFeedback';
import CommentSection from '../CommentSection/CommentSection';
import ProjectFundingStatus from '../ProjectFundingStatus/ProjectFundingStatus';
import ProjectFundingStatusBar from '../ProjectFundingStatus/ProjectFundingStatusBar/ProjectFundingStatusBar';
import defaultProjectPicture from '../../../assets/images/defaultProject.png';
import { updateObject, checkValidity } from '../../../helpers/Validation/Validation';
import * as actions from '../../../store/actions';

const styles = () => ({
  card: {
    margin: '3rem 0',
    padding: '1rem',
  },
  projectHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  projectPicture: {
    borderRadius: '3px',
    height: '100%',
    width: '100%',
  },
  fundingTarget: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  fundingButton: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  fundingModal: {
    display: 'flex',
    justifyContent: 'center',
  },
  fundingFormFields: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});

class ProjectProfile extends Component {
  state = {
    currentTab: 0,
    openFundingModal: false,
    formIsValid: false,
    fundingForm: {
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
      currentFunding: {
        elementType: 'number',
        elementConfig: {
          type: 'number',
          label: 'Quantia para contribuir',
        },
        value: 0,
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        gridSizing: {
          xs: 9,
          sm: false,
          md: false,
          lg: false,
          xl: false,
        },
      },
    },
  };

  componentDidMount() {
    const { onLoadProject, match: { params: { id } } } = this.props;
    onLoadProject(id);
  }

  handleDeleteProject = (id) => {
    const { onDeleteProject } = this.props;
    onDeleteProject(id);
  }

  handleNavChange = (event, value) => {
    this.setState({ currentTab: value });
  };

  handleToggleModal = () => {
    const { openFundingModal } = this.state;
    const toggleModal = !openFundingModal;
    this.setState({ openFundingModal: toggleModal });
  }

  handleInputChange = (event, inputIdentifier) => {
    const { fundingForm } = this.state;
    const updatedFormElement = updateObject(fundingForm[inputIdentifier], {
      value: event.target.value,
      valid: checkValidity(event.target.value, fundingForm[inputIdentifier].validation),
      touched: true,
    });

    const updatedFundingForm = updateObject(fundingForm, {
      [inputIdentifier]: updatedFormElement,
    });

    let formIsValid = true;
    Object.keys(updatedFundingForm).forEach((input) => {
      formIsValid = updatedFundingForm[input].valid && formIsValid;
    });

    this.setState({ fundingForm: updatedFundingForm, formIsValid });
  };

  handleSubmitFunds = () => {
    const { fundingForm, formIsValid } = this.state;
    const {
      project,
      user,
      onFundProject,
    } = this.props;

    const projectFunding = project.currentFunding || 0;
    const userFunds = fundingForm.currentFunding.value * 100;
    const newFundingTotal = projectFunding + userFunds;
    const fundingInfo = {};
    fundingInfo.id = project.id;
    fundingInfo.author = user.email;
    fundingInfo.funds = newFundingTotal;
    fundingInfo.currency = fundingForm.currency.value;
    fundingInfo.createdAt = new Date().toLocaleString();
    if (formIsValid) onFundProject(fundingInfo);
  };

  render() {
    const { classes, project } = this.props;
    const { currentTab, openFundingModal, fundingForm } = this.state;

    const formElements = Object.keys(fundingForm).map(e => (
      {
        id: e,
        config: fundingForm[e],
      }
    ));

    const form = formElements.map(e => (
      <Input
        key={e.id}
        element={e.config}
        changed={event => this.handleInputChange(event, e.id)}
      />
    ));

    if (!project) { return null; }
    const {
      id,
      author,
      title,
      picture,
      introduction,
      description,
      createdAt,
      fundingTarget,
      currency,
      currentFunding,
    } = project;

    const menuOptions = [
      <Button component={Link} to={`/projects/${id}/edit`}>EDIT</Button>,
      <Button onClick={() => this.handleDeleteProject(id)}>DELETE</Button>,
    ];

    return (
      <Grid container justify="center">
        <Grid item xs={12} sm={7}>
          <Paper className={classes.card}>
            <Grid container spacing={32}>
              <Grid item xs={12} sm={4} className={classes.projectHeader}>
                <img
                  src={picture || defaultProjectPicture}
                  alt={title}
                  className={classes.projectPicture}
                />
              </Grid>
              <Grid item xs={12} sm={8}>
                <Grid container>
                  <Grid item xs={12} className={classes.projectHeader}>
                    <Typography variant="title">
                      {title}
                    </Typography>
                    <Typography variant="body1">
                      {`${author} - ${createdAt}`}
                    </Typography>
                    <VerticalMenu options={menuOptions} />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subheading">
                      <strong>Introdução: </strong>
                      {introduction}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <br />
                    <br />
                    <Grid container spacing={16}>
                      <Grid item xs={12} className={classes.fundingTarget}>
                        <Typography variant="title">
                          Financiamento:
                        </Typography>
                        <ProjectFundingStatus
                          currency={currency}
                          currentFunding={currentFunding}
                          fundingTarget={fundingTarget}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <ProjectFundingStatusBar
                          currentFunding={currentFunding}
                          fundingTarget={fundingTarget}
                        />
                      </Grid>
                      <Grid item xs={12} className={classes.fundingButton}>
                        <Button
                          variant="raised"
                          color="secondary"
                          onClick={this.handleToggleModal}
                        >
                          CONTRIBUIR
                        </Button>
                        <WrapperModal
                          title="funding section"
                          open={openFundingModal}
                          closed={this.handleToggleModal}
                          className={classes.fundingModal}
                        >
                          <Grid container spacing={16}>
                            <Grid item xs={12}>
                              <Typography variant="title">
                                Com quanto você quer contribuir?
                              </Typography>
                            </Grid>
                            <Grid item xs={12} className={classes.fundingFormFields}>
                              {form}
                            </Grid>
                            <Grid item xs={12} className={classes.fundingButton}>
                              <Button
                                variant="raised"
                                color="secondary"
                                onClick={this.handleSubmitFunds}
                              >
                                CONTRIBUIR
                              </Button>
                            </Grid>
                          </Grid>
                        </WrapperModal>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subheading">
                  <strong>Descrição: </strong>
                  {description}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Paper>
                  <div className={classes.AppBar}>
                    <AppBar position="static">
                      <Tabs
                        value={currentTab}
                        onChange={this.handleNavChange}
                        fullWidth
                        scrollable
                      >
                        <Tab label="Notícias" />
                        <Tab label="Feedbacks" />
                        <Tab label="Descobertas" />
                        <Tab label="Referências" />
                      </Tabs>
                    </AppBar>
                    {currentTab === 0 && <ProjectNews projectId={id} />}
                    {currentTab === 1 && <ProjectFeedback projectId={id} />}
                    {currentTab === 2 && <ProjectDiscoveries projectId={id} />}
                    {currentTab === 3 && <ProjectReferences projectId={id} />}
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <CommentSection projectId={id} />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

ProjectProfile.defaultProps = {
  project: { currentFunding: '' },
  user: null,
};

ProjectProfile.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  project: PropTypes.shape({
    author: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    introduction: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    fundingTarget: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    currentFunding: PropTypes.string,
  }),
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
  onLoadProject: PropTypes.func.isRequired,
  onDeleteProject: PropTypes.func.isRequired,
  onFundProject: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    project: state.projects.project,
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadProject: id => dispatch(actions.fetchProject(id)),
    onDeleteProject: id => dispatch(actions.deleteProject(id)),
    onFundProject: funding => dispatch(actions.fundProject(funding)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(ProjectProfile));
