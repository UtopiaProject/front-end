import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactQuill from 'react-quill';
import {
  Grid,
  Button,
  Typography,
  Paper,
  withStyles,
} from '@material-ui/core';
import * as actions from '../../../store/actions';

const styles = () => ({
  commentContainer: {
    padding: '1rem',
  },
  commentButton: {
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

  handleSaveComment = () => {
    const { commentBody } = this.state;
    const { onCreateComment, projectId } = this.props;
    const commentData = {};
    commentData.projectId = projectId;
    commentData.description = commentBody;
    commentData.createdAt = new Date().toLocaleString();
    onCreateComment(commentData);
  }

  render() {
    const { commentBody } = this.state;
    const { comments, classes } = this.props;

    let commentList;
    if (comments) {
      commentList = comments.map(comment => (
        <div
          key={comment.id}
          dangerouslySetInnerHTML={{ __html: comment.description }}
        />
      ));
    }

    const notFound = (
      <Typography variant="subheading">
        Nenhum comentário realizado
      </Typography>
    );

    return (
      <Paper className={classes.commentContainer}>
        <Grid item xs={12}>
          <Typography variant="headline">
            Seção de comentários
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={12} className={classes.commentContainer}>
            {commentList || notFound}
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.commentContainer}>
          <ReactQuill
            onChange={this.handleBodyChange}
            value={commentBody}
            modules={CommentSection.modules}
            formats={CommentSection.formats}
            placeholder="bla"
          />
        </Grid>
        <Grid item xs={12} className={classes.commentButton}>
          <Button
            variant="contained"
            color="secondary"
            onClick={this.handleSaveComment}
          >
            COMENTAR
          </Button>
        </Grid>
      </Paper>
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
  onCreateComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    comments: state.comments.comments,
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadComments: projectId => dispatch(actions.fetchComments(projectId)),
    onCreateComment: commentData => dispatch(actions.createComment(commentData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(CommentSection));
