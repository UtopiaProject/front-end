import PropTypes from 'prop-types';
import Dinero from 'dinero.js';

const fundingToInt = (funding) => {
  return parseInt(funding, 10) || 0;
};

const formatFunding = (funding, currency) => {
  const fundingIntValue = fundingToInt(funding);
  const dineroFunding = Dinero({ amount: fundingIntValue, currency });
  const formattedDineroFunding = dineroFunding.toFormat('$0,0');
  return formattedDineroFunding;
};

const ProjectFundingStatus = (props) => {
  const { currency, currentFunding, fundingTarget } = props;
  const formattedCurrentFunding = formatFunding(currentFunding, currency);
  const formattedFundingTarget = formatFunding(fundingTarget, currency);
  const fundingStatus = `${currency} ${formattedCurrentFunding}/${formattedFundingTarget}`;
  return fundingStatus;
};

ProjectFundingStatus.defaultProps = {
  currentFunding: 0,
  fundingTarget: 0,
};

ProjectFundingStatus.propTypes = {
  currency: PropTypes.string.isRequired,
  currentFunding: PropTypes.number,
  fundingTarget: PropTypes.number,
};

export default ProjectFundingStatus;
