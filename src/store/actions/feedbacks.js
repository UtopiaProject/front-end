import * as actionTypes from './actionTypes';
import { comments } from '../firebase';

function commentWithVotes(comment) {
  return comment.upvotes || comment.downvotes;
}

function filterByCommentsWithVotes(commentList) {
  return commentList.filter(commentWithVotes);
}

function commentWithPositiveBalance(comment) {
  const upvoteCount = comment.upvotes || 0;
  const downvoteCount = comment.downvotes || 0;
  const balance = upvoteCount - downvoteCount;
  return balance > 0;
}

function filterByPositiveBalance(commentList) {
  return commentList.filter(commentWithPositiveBalance);
}

function compareToAscending(commentA, commentB) {
  return commentA.upvotes - commentB.upvotes;
}

function sortToAscendingOrder(commentList) {
  return commentList.sort(compareToAscending);
}

function reverseToDescendingOrder(sortedComments) {
  return sortedComments.reverse();
}

function rankComments(commentList) {
  const sortedComments = sortToAscendingOrder(commentList);
  const rankedComments = reverseToDescendingOrder(sortedComments);
  return rankedComments;
}

function getUpToTop3UpvotedComments(rankedComments) {
  if (rankedComments.length < 3) {
    return rankedComments;
  }
  return rankedComments.slice(0, 3);
}

function filterTopUpvotedComments(commentList) {
  const votedComments = filterByCommentsWithVotes(commentList);
  if (votedComments) {
    const commentsWithPositiveBalance = filterByPositiveBalance(votedComments);
    const topComments = commentsWithPositiveBalance.length > 1
      ? rankComments(commentsWithPositiveBalance)
      : commentsWithPositiveBalance;
    return getUpToTop3UpvotedComments(topComments);
  }
  return null;
}

const fetchFeedbacksSuccess = (snapshot) => {
  let feedbacks;
  if (snapshot.val()) {
    feedbacks = Object.values(snapshot.val());
    feedbacks = filterTopUpvotedComments(feedbacks);
  }
  return {
    type: actionTypes.FETCH_FEEDBACKS_SUCCESS,
    feedbacks,
  };
};

export const fetchFeedbacks = (projectId) => {
  return (dispatch) => {
    comments.doReadComments(
      dispatch,
      fetchFeedbacksSuccess,
      projectId,
    );
  };
};
