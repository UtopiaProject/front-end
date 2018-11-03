
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import Grid from '@material-ui/core/Grid';
import ProjectTable from './ProjectTable/ProjectTable';
import ProjectCards from './ProjectCards/ProjectCards';
import ProjectFilter from './ProjectFilter/ProjectFilter';
import * as actions from '../../store/actions';
import ContainerHeader from '../../components/ContainerHeader/ContainerHeader';
import { Typography } from '@material-ui/core';

const styles = theme => ({
  root: {
    padding: '2rem',
    margin: 'auto',
    [theme.breakpoints.up('md')]: {
      maxWidth: '60%',
    },
  },
  listing: {
    marginTop: '1rem',
  },
});

class Projects extends Component {
  state = {
    listAsCards: false,
    displayFilters: false,
  };

  componentDidMount() {
    const { onPageLoad } = this.props;
    onPageLoad();
  }

  handleToggleListing = () => {
    const { listAsCards } = this.state;
    const currentListing = listAsCards;
    this.setState({ listAsCards: !currentListing });
  }

  handleClickFilters = () => {
    const { displayFilters } = this.state;
    const currentDisplay = displayFilters;
    this.setState({ displayFilters: !currentDisplay });
  }

  render() {
    const {
      classes,
      width,
      projects,
      onFilterProjectsByTitle,
    } = this.props;
    const { listAsCards, displayFilters } = this.state;

    let projectsList = null;
    if (projects && ((width === 'sm' || width === 'xs') || listAsCards)) {
      projectsList = <ProjectCards projects={projects} />;
    } else if (projects && !listAsCards) {
      projectsList = <ProjectTable projects={projects} />;
    }

    const notFound = <Typography>Nenhum projeto cadastrado</Typography>;
    return (
      <Grid
        container
        spacing={16}
        alignItems="center"
        justify="center"
        className={classes.root}
      >
        <Grid item md={12}>
          <ContainerHeader
            headline="Projetos"
            listAsCards={listAsCards}
            filterClicked={this.handleClickFilters}
            searchChanged={onFilterProjectsByTitle}
            listingToggled={this.handleToggleListing}
            width={width}
          />
        </Grid>
        <Grid item md={12}>
          <Grid
            container
            spacing={40}
            justify="center"
            alignItems="center"
            className={classes.listing}
          >
            {projectsList || notFound}
          </Grid>
        </Grid>
        <ProjectFilter
          open={displayFilters}
          ModalProps={{ onBackdropClick: this.handleClickFilters }}
        />
      </Grid>
    );
  }
}

Projects.defaultProps = {
  projects: null,
};

Projects.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  width: PropTypes.string.isRequired,
  projects: PropTypes.arrayOf(PropTypes.shape({})),
  onFilterProjectsByTitle: PropTypes.func.isRequired,
  onPageLoad: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(
  withWidth()(withStyles(styles)(Projects)),
);
