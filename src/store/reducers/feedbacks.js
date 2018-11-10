import * as actionTypes from '../actions/actionTypes';

const initialState = {
  feedbacks: null,
  error: null,
};

const fetchTopUpvotedCommentsSuccess = (state, action) => {
  return {
    ...state,
    feedbacks: action.feedbacks,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_FEEDBACKS_SUCCESS: return fetchTopUpvotedCommentsSuccess(state, action);
    default: return state;
  }
};

export default reducer;
