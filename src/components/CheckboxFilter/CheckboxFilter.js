import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';

const CheckboxFilter = (props) => {
  const { title } = props;
  return (
    <ListItem dense button>
      <ListItemText primary={title} />
      <ListItemSecondaryAction>
        <Checkbox />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

CheckboxFilter.propTypes = {
  title: PropTypes.string.isRequired,
};

export default CheckboxFilter;
