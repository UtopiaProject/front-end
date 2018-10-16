import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Paper,
  Typography,
  withStyles,
  Grid,
} from '@material-ui/core';
import emailToGravatar from '../../../helpers/Gravatar/Gravatar';

const styles = () => ({

});

class UserProfile extends Component {
  componentDidMount() {
    // fetch user
  }

  render() {
    const {
      name,
      surname,
      birthdate,
      gender,
      email,
      lattes,
      linkedin,
      stackOverflow,
      summary,
      type,
    } = this.props;

    return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Paper>
            <Grid container spacing={24}>
              <Grid item xs={12} md={6}>
                <img src={emailToGravatar(email)} alt={name} />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h5">
                  {`${name} ${surname}`}
                </Typography>
                <Typography variant="subtitle1">
                  {email}
                </Typography>
                <Typography variant="body1">
                  {summary}
                </Typography>
                <Typography variant="body1">
                  {`${type} - ${gender} - ${birthdate}`}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body1">
                  {lattes}
                </Typography>
                <Typography variant="body1">
                  {linkedin}
                </Typography>
                <Typography variant="body1">
                  {stackOverflow}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

UserProfile.defaultProps = {
  lattes: '',
  linkedin: '',
  stackOverflow: '',
  summary: '',
};

UserProfile.propTypes = {
  name: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
  birthdate: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  lattes: PropTypes.string,
  linkedin: PropTypes.string,
  stackOverflow: PropTypes.string,
  summary: PropTypes.string,
};

const mapStateToProps = () => {
  return {

  };
};

const mapDispatchToProps = () => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UserProfile));
