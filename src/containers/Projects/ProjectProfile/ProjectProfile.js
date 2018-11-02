import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Paper,
  Typography,
  withStyles,
  Grid,
} from '@material-ui/core';
import * as actions from '../../../store/actions';

const styles = () => ({
  card: {
    margin: '3rem 0',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    padding: '1rem',
    textAlign: 'center',
  },
});

class ProjectProfile extends Component {
  componentDidMount() {
    const { onLoadProject, match: { params: { id } } } = this.props;
    onLoadProject(id);
  }

  render() {
    const { classes, project } = this.props;

    if (!project) { return null; }
    const {
      author,
      title,
      picture,
      introduction,
      description,
      createdAt,
    } = project;
    return (
      <Grid
        container
        spacing={40}
        alignItems="center"
        justify="center"
      >
        <Grid item xs={6}>
          <Paper className={classes.card}>
            <img src={picture} alt={title} />
            <Typography variant="title">
              {title}
            </Typography>
            <Typography variant="body1">
              {`${author} - ${createdAt}`}
            </Typography>
            <Typography variant="subheading">
              {introduction}
            </Typography>
            <Typography variant="body1">
              {description}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

ProjectProfile.defaultProps = {
  project: null,
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
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
  onLoadProject: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    project: state.projects.project,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadProject: id => dispatch(actions.fetchProject(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(ProjectProfile));
