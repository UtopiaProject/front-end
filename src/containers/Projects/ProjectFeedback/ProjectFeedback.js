import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'react-quill/dist/quill.snow.css';
import {
  Grid,
  withStyles,
  Typography,
} from '@material-ui/core';
import * as actions from '../../../store/actions';

const styles = () => ({

});

class ProjectDiscoveries extends Component {
  // componentDidMount() {
  //   const { projectId, onLoadDiscovery } = this.props;
  //   onLoadDiscovery(projectId);
  // }

  // componentDidUpdate(prevProps) {
  //   const { projectId, discovery, onLoadDiscovery } = this.props;
  //   const prevDiscoveryExists = prevProps.discovery;
  //   if (prevDiscoveryExists) {
  //     const prevDescription = prevProps.discovery.description;
  //     const currentDescription = discovery.description;
  //     if (prevDescription !== currentDescription) {
  //       onLoadDiscovery(projectId);
  //     }
  //   }
  // }

  render() {
    const { classes } = this.props;

    return (
      <Grid container>
        <Grid item xs={12}>
          <Typography>
            Project Feedback
          </Typography>
        </Grid>
      </Grid>
    );
  }
}

ProjectDiscoveries.defaultProps = {
  error: null,
};

ProjectDiscoveries.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  projectId: PropTypes.string.isRequired,
  error: PropTypes.shape({}),
};

const mapStateToProps = (state) => {
  return {
    error: state.discoveries.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadPositiveFeedbacks: projectId => dispatch(actions.fetchDiscovery(projectId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(ProjectDiscoveries));
