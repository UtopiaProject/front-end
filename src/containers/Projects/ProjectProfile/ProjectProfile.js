import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
import ProjectNews from '../ProjectNews/ProjectNews';
import ProjectDiscoveries from '../ProjectDiscoveries/ProjectDiscoveries';
import ProjectReferences from '../ProjectReferences/ProjectReferences';
import ProjectFeedback from '../ProjectFeedback/ProjectFeedback';
import CommentSection from '../CommentSection/CommentSection';
import ProjectStep, { StepDescription } from '../ProjectStep/ProjectStep';
import ProjectFunding from '../ProjectFunding/ProjectFunding';
import ProjectVoting from '../ProjectVoting/ProjectVoting';
import defaultProjectPicture from '../../../assets/images/defaultProject.png';
import * as steps from '../../../helpers/Steps/Steps';
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
});

class ProjectProfile extends Component {
  state = {
    currentTab: 0,
  };

  componentDidMount() {
    const {
      onLoadProject,
      onLoadCurrentUser,
      match: { params: { id } },
      authUser,
    } = this.props;
    onLoadProject(id);
    if (authUser) onLoadCurrentUser(authUser.email);
  }

  handleDeleteProject = (id) => {
    const { onDeleteProject } = this.props;
    onDeleteProject(id);
  }

  handleNavChange = (event, value) => {
    this.setState({ currentTab: value });
  };

  render() {
    const { classes, project, authUser } = this.props;
    const { currentTab } = this.state;

    if (!project) { return null; }
    const {
      id,
      author,
      title,
      picture,
      introduction,
      description,
      createdAt,
      currentStep,
    } = project;

    const menuOptions = [
      <Button component={Link} to={`/projects/${id}/edit`}>EDITAR</Button>,
      <Button onClick={() => this.handleDeleteProject(id)}>DELETAR</Button>,
    ];

    const prototypingStep = currentStep === steps.PROTOTYPING_STEP;
    const productionStep = currentStep === steps.PRODUCTION_STEP;

    let interactionSection;
    const fundingStep = prototypingStep || productionStep;
    if (fundingStep && authUser) {
      interactionSection = (
        <ProjectFunding project={project} />
      );
    } else if (authUser) {
      interactionSection = (
        <ProjectVoting project={project} authUser={authUser} />
      );
    }

    return (
      <Grid container justify="center">
        <Grid item xs={12} sm={7}>
          <Paper className={classes.card}>
            <Grid container spacing={32}>
              <Grid item xs={12}>
                <StepDescription currentStep={currentStep} />
                <ProjectStep currentStep={currentStep} />
              </Grid>
              <Grid item xs={12} sm={4} className={classes.projectHeader}>
                <img
                  src={picture || defaultProjectPicture}
                  alt={title}
                  className={classes.projectPicture}
                />
              </Grid>
              <Grid item xs={12} sm={8}>
                <Grid container spacing={16}>
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
                    {interactionSection}
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
  authUser: null,
  currentUser: null,
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
    currency: PropTypes.string.isRequired,
    currentFunding: PropTypes.number,
    fundingTarget: PropTypes.number.isRequired,
  }),
  authUser: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }),
  currentUser: PropTypes.shape({}),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
  onLoadProject: PropTypes.func.isRequired,
  onDeleteProject: PropTypes.func.isRequired,
  onLoadCurrentUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    project: state.projects.project,
    authUser: state.auth.user,
    currentUser: state.users.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadProject: id => dispatch(actions.fetchProject(id)),
    onDeleteProject: id => dispatch(actions.deleteProject(id)),
    onLoadCurrentUser: email => dispatch(actions.fetchUser(email)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(ProjectProfile));
