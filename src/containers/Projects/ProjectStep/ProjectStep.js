import React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';

const TOTAL_STEPS = 5;

const stepTitle = {
  1: 'Proposta',
  2: 'Avaliação',
  3: 'Prototipação',
  4: 'Reavaliação',
  5: 'Produção',
};

export const StepDescription = (props) => {
  const { currentStep } = props;
  return (
    <Typography variant="title">
      {`Passo atual: ${stepTitle[currentStep]}`}
    </Typography>
  );
};

const stepCompletionInPercentage = (step) => {
  return ((step / TOTAL_STEPS) || 0) * 100;
};

const ProjectStep = (props) => {
  const { currentStep } = props;
  return (
    <LinearProgress
      variant="determinate"
      value={stepCompletionInPercentage(currentStep)}
    />
  );
};

ProjectStep.propTypes = {
  currentStep: PropTypes.number.isRequired,
};

export default ProjectStep;
