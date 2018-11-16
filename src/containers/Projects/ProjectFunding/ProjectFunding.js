import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Grid,
  Typography,
  withStyles,
} from '@material-ui/core';
import ProjectFundingStatus from './ProjectFundingStatus/ProjectFundingStatus';
import ProjectFundingStatusBar from './ProjectFundingStatus/ProjectFundingStatusBar/ProjectFundingStatusBar';
import ProjectFundingForm from './ProjectFundingForm/ProjectFundingForm';
import * as actions from '../../../store/actions';
import * as steps from '../../../helpers/Steps/Steps';

const styles = () => ({
  fundingButton: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  fundingTarget: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});

class ProjectFunding extends Component {
  advanceProject = () => {
    const { project, onAdvanceProjectStep, onResetProjectFunding } = this.props;
    if (project.currentStep === steps.PROTOTYPING_STEP) {
      onAdvanceProjectStep(project);
    } else if (project.currentStep === steps.PRODUCTION_STEP) {
      onResetProjectFunding(project);
    }
  }

  render() {
    const { project, classes } = this.props;
    const {
      id,
      currency,
      currentFunding,
      fundingTarget,
    } = project;

    if (currentFunding === fundingTarget) this.advanceProject();

    return (
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
        <Grid item xs={12}>
          <ProjectFundingForm
            projectId={id}
            currentFunding={currentFunding}
          />
        </Grid>
      </Grid>
    );
  }
}

ProjectFunding.defaultProps = {
  project: null,
};

ProjectFunding.propTypes = {
  project: PropTypes.shape({}),
  onAdvanceProjectStep: PropTypes.func.isRequired,
  onResetProjectFunding: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAdvanceProjectStep: projectData => dispatch(actions.advanceProjectStep(projectData)),
    onResetProjectFunding: projectData => dispatch(actions.resetProjectFunding(projectData)),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(
  withStyles(styles)(ProjectFunding),
);
