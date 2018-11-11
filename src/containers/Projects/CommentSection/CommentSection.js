import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactQuill from 'react-quill';
import {
  Grid,
  Button,
  IconButton,
  Typography,
  Paper,
  withStyles,
} from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import ThumbsUpIcon from '@material-ui/icons/ThumbUp';
import ThumbsDownIcon from '@material-ui/icons/ThumbDown';
import * as actions from '../../../store/actions';

const styles = theme => ({
  commentSectionHeader: {
    padding: '0 1rem',
    display: 'flex',
    justifyContent: 'space-between',
  },
  commentContainer: {
    padding: '1rem',
  },
  commentButton: {
    padding: '0 1rem',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  comment: {
    border: '0.5px solid #ccc',
    margin: '0.5rem 0',
  },
  commentHeader: {
    padding: '0 1rem',
    backgroundColor: '#ccc',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: '3rem',
  },
  commentBody: {
    padding: '0 1rem',
    display: 'flex',
    flexWrap: 'wrap',
    wordBreak: 'break-all',
  },
  commentVoting: {
    padding: '0 0.3rem',
  },
  voteUp: {
    '&:hover': {
      color: theme.palette.primary.light,
    },
  },
  voteUpClicked: {
    color: theme.palette.primary.light,
  },
  voteDown: {
    '&:hover': {
      color: theme.palette.secondary.light,
    },
  },
  voteDownClicked: {
    color: theme.palette.secondary.light,
  },
});

class CommentSection extends Component {
  state = {
    commentBody: '',
    comment: null,
  };

  componentDidMount() {
    const { onLoadComments, projectId } = this.props;
    onLoadComments(projectId);
  }

  handleBodyChange = (commentBody) => {
    this.setState({ commentBody });
  }

  handleSaveComment = () => {
    const { commentBody, comment } = this.state;
    const {
      onCreateComment,
      onUpdateComment,
      projectId,
      user,
    } = this.props;

    const commentData = {};
    commentData.projectId = projectId;
    commentData.description = commentBody;
    commentData.createdAt = new Date().toLocaleString();
    commentData.author = user.email;
    if (comment) {
      commentData.id = comment.id;
      onUpdateComment(commentData);
      this.setState({ commentBody: '', comment: null });
      return;
    }
    onCreateComment(commentData);
    this.setState({ commentBody: '' });
  }

  handleEditComment = (comment) => {
    const { description } = comment;
    this.setState({ commentBody: description, comment });
  }

  handleDeleteComment = (comment) => {
    const { onDeleteComment } = this.props;
    onDeleteComment(comment);
  }

  handleUpVote = (comment) => {
    const { onUpvoteComment } = this.props;
    onUpvoteComment(comment);
  }

  handleDownVote = (comment) => {
    const { onDownvoteComment } = this.props;
    onDownvoteComment(comment);
  }

  render() {
    const { commentBody } = this.state;
    const { comments, user, classes } = this.props;

    let commentCount;
    let commentList;
    if (comments && user) {
      commentCount = `${comments.length} comentários`;
      commentList = comments.map(comment => (
        <Grid key={comment.id} item xs={12}>
          <Grid container className={classes.comment}>
            <Grid
              item
              xs={12}
              className={classes.commentHeader}
            >
              <Typography>
                {`${comment.author} - ${comment.createdAt}`}
              </Typography>
              {
                comment.author === user.email
                  ? (
                    <div>
                      <IconButton
                        onClick={() => this.handleEditComment(comment)}
                      >
                        <EditOutlinedIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => this.handleDeleteComment(comment)}
                      >
                        <DeleteOutlinedIcon />
                      </IconButton>
                    </div>
                  )
                  : null
              }
            </Grid>
            <Grid item xs={12} className={classes.commentBody}>
              <div
                key={comment.id}
                dangerouslySetInnerHTML={{ __html: comment.description }}
              />
            </Grid>
            <Grid item xs={12} className={classes.commentVoting}>
              <IconButton
                className={classes.voteUp}
                onClick={() => this.handleUpVote(comment)}
              >
                <ThumbsUpIcon />
                {`${comment.upvotes || 0}`}
              </IconButton>
              <IconButton
                className={classes.voteDown}
                onClick={() => this.handleDownVote(comment)}
              >
                <ThumbsDownIcon />
                {`${comment.downvotes || 0}`}
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      ));
    }

    const notFound = (
      <Typography variant="subheading">
        Nenhum comentário realizado
      </Typography>
    );

    return (
      <Paper className={classes.commentContainer}>
        <Grid item xs={12} className={classes.commentSectionHeader}>
          <Typography variant="headline">
            Seção de comentários
          </Typography>
          <Typography variant="headline">
            {commentCount}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container className={classes.commentContainer}>
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

CommentSection.defaultProps = {
  comments: null,
};

CommentSection.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  projectId: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape({})),
  user: PropTypes.shape({}).isRequired,
  onCreateComment: PropTypes.func.isRequired,
  onLoadComments: PropTypes.func.isRequired,
  onUpdateComment: PropTypes.func.isRequired,
  onDeleteComment: PropTypes.func.isRequired,
  onUpvoteComment: PropTypes.func.isRequired,
  onDownvoteComment: PropTypes.func.isRequired,
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
    onUpdateComment: commentData => dispatch(actions.updateComment(commentData)),
    onDeleteComment: commentData => dispatch(actions.deleteComment(commentData)),
    onUpvoteComment: commentData => dispatch(actions.upvoteComment(commentData)),
    onDownvoteComment: commentData => dispatch(actions.downvoteComment(commentData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(CommentSection));
