import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Grid,
  Typography,
  Button,
  withStyles,
} from '@material-ui/core';
import CurrencyCodes from 'currency-codes';
import * as actions from '../../../../store/actions';
import Input from '../../../../components/Input/Input';
import { updateObject, checkValidity } from '../../../../helpers/Validation/Validation';
import WrapperModal from '../../../../components/Modal/WrapperModal';

const styles = () => ({
  fundingFormFields: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  fundingButton: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  fundingModal: {
    display: 'flex',
    justifyContent: 'center',
  },
});

class ProjectFundingForm extends Component {
  state = {
    openFundingModal: false,
    formIsValid: false,
    fundingForm: {
      currency: {
        elementType: 'select',
        elementConfig: {
          label: 'Moeda',
          options: CurrencyCodes.codes().map(code => ({ value: code, label: code })),
        },
        value: 'USD',
        validation: {},
        valid: true,
        touched: false,
        gridSizing: {
          xs: 2,
          sm: false,
          md: false,
          lg: false,
          xl: false,
        },
      },
      currentFunding: {
        elementType: 'number',
        elementConfig: {
          type: 'number',
          label: 'Quantia para contribuir',
        },
        value: 0,
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        gridSizing: {
          xs: 9,
          sm: false,
          md: false,
          lg: false,
          xl: false,
        },
      },
    },
  };

  handleToggleModal = () => {
    const { openFundingModal } = this.state;
    const toggleModal = !openFundingModal;
    this.setState({ openFundingModal: toggleModal });
  }

  handleInputChange = (event, inputIdentifier) => {
    const { fundingForm } = this.state;
    const updatedFormElement = updateObject(fundingForm[inputIdentifier], {
      value: event.target.value,
      valid: checkValidity(event.target.value, fundingForm[inputIdentifier].validation),
      touched: true,
    });

    const updatedFundingForm = updateObject(fundingForm, {
      [inputIdentifier]: updatedFormElement,
    });

    let formIsValid = true;
    Object.keys(updatedFundingForm).forEach((input) => {
      formIsValid = updatedFundingForm[input].valid && formIsValid;
    });

    this.setState({ fundingForm: updatedFundingForm, formIsValid });
  };

  handleSubmitFunds = () => {
    const { fundingForm, formIsValid } = this.state;
    const {
      projectId,
      currentFunding,
      authUser,
      onFundProject,
    } = this.props;

    const projectFunding = currentFunding || 0;
    const userFunds = fundingForm.currentFunding.value * 100;
    const newFundingTotal = projectFunding + userFunds;
    const fundingInfo = {};
    fundingInfo.id = projectId;
    fundingInfo.author = authUser.email;
    fundingInfo.funds = newFundingTotal;
    fundingInfo.currency = fundingForm.currency.value;
    fundingInfo.createdAt = new Date().toLocaleString();
    if (formIsValid) onFundProject(fundingInfo);
  };

  render() {
    const { classes } = this.props;
    const { fundingForm, openFundingModal } = this.state;

    const formElements = Object.keys(fundingForm).map(e => (
      {
        id: e,
        config: fundingForm[e],
      }
    ));

    const form = formElements.map(e => (
      <Input
        key={e.id}
        element={e.config}
        changed={event => this.handleInputChange(event, e.id)}
      />
    ));

    return (
      <div>
        <div className={classes.fundingButton}>
          <Button
            variant="raised"
            color="secondary"
            onClick={this.handleToggleModal}
          >
            CONTRIBUIR
          </Button>
        </div>
        <WrapperModal
          title="funding section"
          open={openFundingModal}
          closed={this.handleToggleModal}
          className={classes.fundingModal}
        >
          <Grid container spacing={16}>
            <Grid item xs={12}>
              <Typography variant="title">
                Com quanto você quer contribuir?
              </Typography>
            </Grid>
            <Grid item xs={12} className={classes.fundingFormFields}>
              {form}
            </Grid>
            <Grid item xs={12} className={classes.fundingButton}>
              <Button
                variant="raised"
                color="secondary"
                onClick={this.handleSubmitFunds}
              >
                CONTRIBUIR
              </Button>
            </Grid>
          </Grid>
        </WrapperModal>
      </div>
    );
  }
}

ProjectFundingForm.propTypes = {
  projectId: PropTypes.string.isRequired,
  currentFunding: PropTypes.number.isRequired,
  classes: PropTypes.shape({}).isRequired,
  authUser: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
  onFundProject: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    authUser: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFundProject: funding => dispatch(actions.fundProject(funding)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(ProjectFundingForm));
