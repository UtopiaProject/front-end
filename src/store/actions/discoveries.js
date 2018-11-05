import * as actionTypes from './actionTypes';
import { discoveries } from '../firebase';

const fetchDiscoverySuccess = (snapshot) => {
  return {
    type: actionTypes.FETCH_DISCOVERY_SUCCESS,
    discovery: snapshot.val(),
  };
};

export const fetchDiscovery = (projectId) => {
  return (dispatch) => {
    discoveries.doReadDiscovery(
      dispatch,
      fetchDiscoverySuccess,
      projectId,
    );
  };
};

const updateDiscoveryFailure = (error) => {
  return {
    type: actionTypes.UPDATE_DISCOVERY_FAILURE,
    error,
  };
};

export const updateDiscovery = (discovery) => {
  return (dispatch) => {
    discoveries.doUpdateDiscovery(discovery)
      .catch((error) => {
        dispatch(updateDiscoveryFailure(error));
      });
  };
};
