import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactQuill from 'react-quill';
import {
  Grid,
  Typography,
  Paper,
  withStyles,
} from '@material-ui/core';
import * as actions from '../../../store/actions';

const styles = () => ({
  commentContainer: {
    padding: '1rem',
  },
});

class CommentSection extends Component {
  state = {
    commentBody: '',
  };

  componentDidMount() {
    const { onLoadComments, projectId } = this.props;
    onLoadComments(projectId);
  }

  handleBodyChange = (commentBody) => {
    this.setState({ commentBody });
  }

  render() {
    const { commentBody } = this.state;
    const { comments, classes } = this.props;

    let commentList;
    if (comments) {
      commentList = comments.map(comment => (
        <Grid item xs={12} className={classes.commentContainer}>
          <div dangerouslySetInnerHTML={{ __html: comment.description }} />
        </Grid>
      ));
    }

    const notFound = (
      <Typography variant="subheading">
        No comments found
      </Typography>
    );

    return (
      <Fragment>
        <Grid item xs={12}>
          <Typography variant="headline">
            Comments Section
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Paper>
            {commentList || notFound}
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <ReactQuill
            onChange={this.handleBodyChange}
            value={commentBody}
            modules={CommentSection.modules}
            formats={CommentSection.formats}
            placeholder="bla"
          />
        </Grid>
      </Fragment>
    );
  }
}

CommentSection.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' },
      { indent: '-1' }, { indent: '+1' }],
    ['link', 'image', 'video'],
    ['clean'],
  ],
};

CommentSection.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video',
];

CommentSection.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  projectId: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  user: PropTypes.shape({}).isRequired,
  onLoadComments: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    comments: state.comments.comments,
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadComments: (projectId) => dispatch(actions.fetchComments(projectId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(CommentSection));
