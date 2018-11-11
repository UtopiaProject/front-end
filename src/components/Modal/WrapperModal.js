import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
});

const WrapperModal = (props) => {
  const {
    classes,
    title,
    open,
    closed,
    children,
  } = props;

  return (
    <Modal
      aria-labelledby={title}
      aria-describedby={title}
      open={open}
      onClose={closed}
    >
      <div className={classes.paper}>
        {children}
      </div>
    </Modal>
  );
};

WrapperModal.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  title: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  closed: PropTypes.func.isRequired,
  children: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(WrapperModal);
