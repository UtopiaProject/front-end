import * as actionTypes from './actionTypes';
import { references } from '../firebase';

const fetchReferenceSuccess = (snapshot) => {
  return {
    type: actionTypes.FETCH_REFERENCE_SUCCESS,
    reference: snapshot.val(),
  };
};

export const fetchReference = (projectId) => {
  return (dispatch) => {
    references.doReadReference(
      dispatch,
      fetchReferenceSuccess,
      projectId,
    );
  };
};

const updateReferenceFailure = (error) => {
  return {
    type: actionTypes.UPDATE_REFERENCE_FAILURE,
    error,
  };
};

export const updateReference = (reference) => {
  return (dispatch) => {
    references.doUpdateReference(reference)
      .catch((error) => {
        dispatch(updateReferenceFailure(error));
      });
  };
};
