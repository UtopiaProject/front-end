import React from 'react';
import {
  Grid,
  TextField,
  MenuItem,
} from '@material-ui/core';

const Input = (props) => {
  const { element, changed } = props;
  const {
    elementType,
    elementConfig,
    value,
    validation,
    valid,
    touched,
    gridSizing,
  } = element;

  const error = (!valid && validation && touched);

  let inputElement = null;
  switch (elementType) {
    case ('select'):
      inputElement = (
        <TextField
          required={validation.required}
          select
          label={elementConfig.label}
          value={value}
          onChange={changed}
          onBlur={changed}
          error={error}
          fullWidth
        >
          {elementConfig.options.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      );
      break;
    case ('date'):
      inputElement = (
        <TextField
          required={validation.required}
          type={elementType}
          label={elementConfig.label}
          value={value}
          onChange={changed}
          onBlur={changed}
          error={error}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
      );
      break;
    case ('textarea'):
      inputElement = (
        <TextField
          multiline
          rowsMax="4"
          required={validation.required}
          type={elementType}
          label={elementConfig.label}
          value={value}
          onChange={changed}
          onBlur={changed}
          error={error}
          fullWidth
        />
      );
      break;
    default:
      inputElement = (
        <TextField
          required={validation.required}
          type={elementType}
          label={elementConfig.label}
          value={value}
          onChange={changed}
          onBlur={changed}
          error={error}
          fullWidth
        />
      );
  }

  return (
    <Grid item {...gridSizing}>
      {inputElement}
    </Grid>
  );
};

export default Input;
