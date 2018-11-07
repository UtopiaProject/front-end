import * as actionTypes from '../actions/actionTypes';

const initialState = {
  comment: null,
  comments: null,
  error: null,
};

const createCommentFailure = (state, action) => {
  return {
    ...state,
    error: action.error,
  };
};

const fetchCommentsSuccess = (state, action) => {
  return {
    ...state,
    comments: action.comments,
  };
};

const updateCommentFailure = (state, action) => {
  return {
    ...state,
    error: action.error,
  };
};

const deleteCommentSuccess = (state, action) => {
  return {
    ...state,
    comment: null,
  };
};

const deleteCommentFailure = (state, action) => {
  return {
    ...state,
    error: action.error,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_COMMENT_FAILURE: return createCommentFailure(state, action);
    case actionTypes.FETCH_COMMENTS_SUCCESS: return fetchCommentsSuccess(state, action);
    case actionTypes.UPDATE_COMMENT_FAILURE: return updateCommentFailure(state, action);
    case actionTypes.DELETE_COMMENT_SUCCESS: return deleteCommentSuccess(state, action);
    case actionTypes.DELETE_COMMENT_FAILURE: return deleteCommentFailure(state, action);
    default: return state;
  }
};

export default reducer;
