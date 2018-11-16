import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Button,
  Grid,
  LinearProgress,
  withStyles,
  Typography,
} from '@material-ui/core';
import * as actions from '../../../store/actions';
import * as steps from '../../../helpers/Steps/Steps';

const APPROVE = 'approve';
const DISAPPROVE = 'disapprove';
const REAPPROVE = 'reapprove';
const REJECT = 'reject';


const styles = () => ({
  votingSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 0.5rem',
  },
  votingStatus: {
    width: '100%',
  },
});

const getVoteHandler = (voteType, props) => {
  const {
    onApproveProject,
    onDisapproveProject,
    onReapproveProject,
    onRejectProject,
  } = props;
  switch (voteType) {
    case APPROVE: return onApproveProject;
    case DISAPPROVE: return onDisapproveProject;
    case REAPPROVE: return onReapproveProject;
    case REJECT: return onRejectProject;
    default: return undefined;
  }
};

class ProjectVoting extends Component {
  componentDidMount() {
    const { onLoadUsers } = this.props;
    onLoadUsers();
  }

  castVote = (voteType) => {
    const handler = getVoteHandler(voteType, this.props);
    const { project: { id }, authUser } = this.props;
    const voterData = {
      id,
      author: authUser.email,
      createdAt: new Date().toLocaleDateString(),
    };
    handler(voterData);
  }

  advanceProject = () => {
    const { project, onAdvanceProjectStep } = this.props;
    onAdvanceProjectStep(project);
  }

  render() {
    const { project, users, classes } = this.props;
    let castPositiveVote;
    let castNegativeVote;
    let currentBalance;
    let requiredApprovals;

    if (project && users) {
      const userBaseCount = users.length || 0;
      requiredApprovals = userBaseCount * 0.4;

      const evaluationStep = project.currentStep === steps.EVALUATION_STEP;
      const reevaluationStep = project.currentStep === steps.REEVALUATION_STEP;

      if (evaluationStep) {
        castPositiveVote = () => this.castVote(APPROVE);
        castNegativeVote = () => this.castVote(DISAPPROVE);

        const approvers = project.approvers || [];
        const approversCount = Object.values(approvers).length;
        const disapprovers = project.disapprovers || [];
        const disapproversCount = Object.values(disapprovers).length;
        currentBalance = approversCount - disapproversCount;
      } else if (reevaluationStep) {
        castPositiveVote = () => this.castVote(REAPPROVE);
        castNegativeVote = () => this.castVote(REJECT);

        const reapprovers = project.reapprovers || [];
        const reapproversCount = Object.values(reapprovers).length;
        const rejectors = project.rejectors || [];
        const rejectorsCount = Object.values(rejectors).length;
        currentBalance = reapproversCount - rejectorsCount;
      }
    }

    requiredApprovals = Math.ceil(requiredApprovals);
    const votingStatusBalance = requiredApprovals - currentBalance;
    if (votingStatusBalance === 0) this.advanceProject();
    const votingStatus = ((currentBalance / requiredApprovals) || 0) * 100;

    return (
      <Grid container>
        <Grid item xs={12} className={classes.votingSection}>
          <div>
            <Typography variant="title">
              {`Votos necessários: ${votingStatusBalance}`}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={votingStatus}
              className={classes.votingStatus}
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={castPositiveVote}
          >
            APROVAR
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={castNegativeVote}
          >
            REJEITAR
          </Button>
        </Grid>
      </Grid>
    );
  }
}

ProjectVoting.defaultProps = {
  onApproveProject: null,
  onReapproveProject: null,
  onDisapproveProject: null,
  onRejectProject: null,
  users: null,
};

ProjectVoting.propTypes = {
  project: PropTypes.shape({}).isRequired,
  authUser: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({})),
  onApproveProject: PropTypes.func,
  onReapproveProject: PropTypes.func,
  onDisapproveProject: PropTypes.func,
  onRejectProject: PropTypes.func,
  onLoadUsers: PropTypes.func.isRequired,
  onAdvanceProjectStep: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
};

const mapStateToProps = (state) => {
  return {
    users: state.users.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onApproveProject: approverData => dispatch(actions.approveProject(approverData)),
    onReapproveProject: reapproverData => dispatch(actions.reapproveProject(reapproverData)),
    onDisapproveProject: disapproverData => dispatch(actions.disapproveProject(disapproverData)),
    onRejectProject: rejectorData => dispatch(actions.rejectProject(rejectorData)),
    onLoadUsers: () => dispatch(actions.fetchUsers()),
    onAdvanceProjectStep: projectData => dispatch(actions.advanceProjectStep(projectData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(ProjectVoting));
