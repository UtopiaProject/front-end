import * as actionTypes from './actionTypes';
import { comments } from '../firebase';

const createCommentFailure = (error) => {
  return {
    type: actionTypes.CREATE_COMMENT_FAILURE,
    error,
  };
};

export const createComment = (comment) => {
  return (dispatch) => {
    comments.doCreateComment(comment)
      .catch((error) => {
        dispatch(createCommentFailure(error));
      });
  };
};

const fetchCommentsSuccess = (snapshot) => {
  let commentList;
  if (snapshot.val()) {
    commentList = Object.values(snapshot.val());
  }
  return {
    type: actionTypes.FETCH_COMMENTS_SUCCESS,
    comments: commentList,
  };
};

export const fetchComments = (projectId) => {
  return (dispatch) => {
    comments.doReadComments(dispatch, fetchCommentsSuccess, projectId);
  };
};

const updateCommentFailure = (error) => {
  return {
    type: actionTypes.UPDATE_COMMENT_FAILURE,
    error,
  };
};

export const updateComment = (comment) => {
  return (dispatch) => {
    comments.doUpdateComment(comment)
      .catch((error) => {
        dispatch(updateCommentFailure(error));
      });
  };
};

const deleteCommentSuccess = () => {
  return {
    type: actionTypes.DELETE_COMMENT_SUCCESS,
  };
};

const deleteCommentFailure = (error) => {
  return {
    type: actionTypes.DELETE_COMMENT_FAILURE,
    error,
  };
};

export const deleteComment = (id) => {
  return (dispatch) => {
    comments.doDeleteComment(id)
      .then(() => {
        dispatch(deleteCommentSuccess());
      })
      .catch((error) => {
        dispatch(deleteCommentFailure(error));
      });
  };
};
