import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../store/actions';

class Projects extends Component {
  render() {
    const { projects } = this.props;
    return (
      <div>
        <h1>Projects</h1>
        {projects}
      </div>
    );
  }
}

Projects.defaultProps = {
  projects: null,
};

Projects.propTypes = {
  projects: PropTypes.shape({}),
};

const mapStateToProps = (state) => {
  return {
    projects: state.projects.projects,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPageLoad: dispatch(() => actions.fetchProjects()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
