import React from 'react';
import PropTypes from 'prop-types';
import { LinearProgress } from '@material-ui/core';

const fundingToInt = (funding) => {
  return parseInt(funding, 10) || 0;
};

const handleFundingStatus = (currentFunding, fundingTarget) => {
  const fundingPercentage = fundingToInt(currentFunding) / fundingToInt(fundingTarget);
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

ProjectFundingStatusBar.propTypes = {
  currentFunding: PropTypes.string.isRequired,
  fundingTarget: PropTypes.string.isRequired,
};

export default ProjectFundingStatusBar;
