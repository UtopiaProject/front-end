
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import TuneOutlined from '@material-ui/icons/TuneOutlined';
import AppsOutlined from '@material-ui/icons/AppsOutlined';
import ViewListOutlined from '@material-ui/icons/ViewListOutlined';
import { TextField, Typography } from '@material-ui/core';
import ProjectCard from './ProjectCard/ProjectCard';
import ProjectTable from './ProjectTable/ProjectTable';
import * as actions from '../../store/actions';

const styles = () => ({
  root: {
    padding: '2rem',
    maxWidth: '60%',
    margin: 'auto',
  },
  listing: {
    marginTop: '3rem',
  },
});

class Projects extends Component {
  state = {
    listAsCards: false,
  };

  handleToggleListing = () => {
    const { listAsCards } = this.state;
    const currentListing = listAsCards;
    this.setState({ listAsCards: !currentListing });
  }

  render() {
    const { projects, classes, onFilterProjectsByTitle } = this.props;
    const { listAsCards } = this.state;

    let listAsCardsToggle = <ViewListOutlined onClick={this.handleToggleListing} />;
    if (listAsCards) {
      listAsCardsToggle = <AppsOutlined onClick={this.handleToggleListing} />;
    }

    let projectsList = null;
    if (projects && listAsCards) {
      projectsList = projects.map(project => (
        <Grid item md={4} key={project.id}>
          <ProjectCard
            picture={project.picture}
            author={project.author}
            introduction={project.introduction}
            title={project.title}
          />
        </Grid>
      ));
    } else if (projects && !listAsCards) {
      projectsList = <ProjectTable projects={projects} />;
    }
    return (
      <Grid
        container
        spacing={16}
        alignItems="center"
        justify="center"
        className={classes.root}
      >
        <Grid item md={1}>
          <Typography variant="headline">Projetos</Typography>
        </Grid>
        <Grid item md={12}>
          <Grid container spacing={16} alignItems="center" justify="center">
            <Grid item>
              <TuneOutlined />
            </Grid>
            <Grid item>
              <SearchOutlined />
            </Grid>
            <Grid item md={8}>
              <TextField
                placeholder="Pesquisar projetos"
                fullWidth
                onChange={event => onFilterProjectsByTitle(event.target.value)}
              />
            </Grid>
            <Grid item>
              {listAsCardsToggle}
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={12}>
          <Grid
            container
            spacing={40}
            justify="center"
            alignItems="center"
            className={classes.listing}
          >
            {projectsList}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

Projects.defaultProps = {
  projects: null,
  classes: PropTypes.shape({}),
};

Projects.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.shape({})),
  classes: PropTypes.shape({}),
  onFilterProjectsByTitle: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    projects: state.projects.projects,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPageLoad: () => dispatch(actions.fetchProjects()),
    onFilterProjectsByTitle: title => dispatch(actions.filterProjectsByTitle(title)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Projects));
