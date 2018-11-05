import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
import { Link } from 'react-router-dom';
import VerticalMenu from '../../../components/VerticalMenu/VerticalMenu';
import ProjectNews from '../ProjectNews/ProjectNews';
import ProjectDiscoveries from '../ProjectDiscoveries/ProjectDiscoveries';
import defaultProjectPicture from '../../../assets/images/defaultProject.png';
import * as actions from '../../../store/actions';

const styles = theme => ({
  card: {
    margin: '3rem 0',
    padding: '1rem',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardImage: {
    borderRadius: '3px',
    height: '100%',
    width: '100%',
  },
  appBar: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

class ProjectProfile extends Component {
  state = {
    currentTab: 0,
  };

  componentDidMount() {
    const { onLoadProject, match: { params: { id } } } = this.props;
    onLoadProject(id);
  }

  handleDeleteProject = (id) => {
    const { onDeleteProject } = this.props;
    onDeleteProject(id);
  }

  handleChange = (event, value) => {
    this.setState({ currentTab: value });
  };

  render() {
    const { classes, project } = this.props;
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
              <Grid item xs={12} sm={4} className={classes.cardHeader}>
                <img
                  src={picture || defaultProjectPicture}
                  alt={title}
                  className={classes.cardImage}
                />
              </Grid>
              <Grid item xs={12} sm={8}>
                <Grid container>
                  <Grid item xs={12} className={classes.cardHeader}>
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
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subheading">
                  <strong>Descrição: </strong>
                  {description}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <div className={classes.AppBar}>
                  <AppBar position="static">
                    <Tabs
                      value={currentTab}
                      onChange={this.handleChange}
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
                  {currentTab === 1 && <Typography>Item Two</Typography>}
                  {currentTab === 2 && <ProjectDiscoveries projectId={id} />}
                  {currentTab === 3 && <Typography>Item Four</Typography>}
                </div>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

ProjectProfile.defaultProps = {
  project: null,
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(ProjectProfile));
