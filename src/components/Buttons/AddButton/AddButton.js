import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/AddOutlined';

const AddButton = (props) => {
  const { clicked } = props;
  return (
    (
      <Button
        variant="fab"
        color="secondary"
        onClick={clicked}
      >
        <AddIcon />
      </Button>
    )
  );
};

AddButton.propTypes = {
  clicked: PropTypes.func.isRequired,
};

export default AddButton;
