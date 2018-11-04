import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';

const CreateButton = (props) => {
  const { clicked } = props;
  return (
    (
      <Button
        variant="fab"
        color="secondary"
        onClick={clicked}
      >
        <SaveOutlinedIcon />
      </Button>
    )
  );
};

CreateButton.propTypes = {
  clicked: PropTypes.func.isRequired,
};

export default CreateButton;
