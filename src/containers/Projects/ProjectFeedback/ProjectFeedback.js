import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'react-quill/dist/quill.snow.css';
import {
  Grid,
  Paper,
  withStyles,
  Typography,
} from '@material-ui/core';
import * as actions from '../../../store/actions';

const styles = () => ({
  feedbackBody: {
    padding: '0 1rem',
    display: 'flex',
    flexWrap: 'wrap',
    wordBreak: 'break-all',
  },
  feedback: {
    display: 'flex',
    alignItems: 'center',
    minHeight: '10rem',
  },
});

class ProjectFeedback extends Component {
  componentDidMount() {
    const { projectId, onLoadFeedbacks } = this.props;
    onLoadFeedbacks(projectId);
  }

  render() {
    const { classes, feedbacks } = this.props;
    let projectFeedbacks;
    if (feedbacks) {
      projectFeedbacks = (
        <Grid container spacing={16}>
          {
            feedbacks.map(feedback => (
              <Grid key={feedback.id} item xs={12}>
                <Paper>
                  <Grid container className={classes.feedback}>
                    <Grid item xs={12} sm={9}>
                      <Typography
                        className={classes.feedbackBody}
                        variant="title"
                      >
                        {feedback.author}
                      </Typography>
                      <div
                        className={classes.feedbackBody}
                        dangerouslySetInnerHTML={{ __html: feedback.description }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <Typography variant="display1">
                        {`${feedback.upvotes} Upvotes`}
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            ))
          }
        </Grid>
      );
    }
    return (
      <Grid container>
        <Grid item xs={12}>
          {projectFeedbacks}
        </Grid>
      </Grid>
    );
  }
}

ProjectFeedback.defaultProps = {
  feedbacks: null,
};

ProjectFeedback.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  projectId: PropTypes.string.isRequired,
  feedbacks: PropTypes.arrayOf(PropTypes.shape({})),
  onLoadFeedbacks: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    feedbacks: state.feedbacks.feedbacks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadFeedbacks: projectId => dispatch(actions.fetchFeedbacks(projectId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(ProjectFeedback));
