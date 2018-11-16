import React from 'react';
import PropTypes from 'prop-types';
import { LinearProgress } from '@material-ui/core';

const handleFundingStatus = (currentFunding, fundingTarget) => {
  // return 0 if percentage is NaN
  const fundingPercentage = (currentFunding / fundingTarget) || 0;
  return fundingPercentage * 100;
};

const ProjectFundingStatusBar = (props) => {
  const { currentFunding, fundingTarget } = props;
  return (
    <LinearProgress
      variant="determinate"
      value={handleFundingStatus(currentFunding, fundingTarget)}
    />
  );
};

ProjectFundingStatusBar.defaultProps = {
  currentFunding: 0,
  fundingTarget: 0,
};

ProjectFundingStatusBar.propTypes = {
  currentFunding: PropTypes.number,
  fundingTarget: PropTypes.number,
};

export default ProjectFundingStatusBar;
