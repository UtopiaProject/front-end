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
import * as actions from '../../../store/actions';

const styles = () => ({

});

class UserProfile extends Component {
  componentDidMount() {
    const { onLoadUser, match: { params: { email } } } = this.props;
    onLoadUser(email);
  }

  render() {
    const { user } = this.props;
    
    if (!user) { return null; }
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
    } = Object.values(user)[0];
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
  user: null,
};

UserProfile.propTypes = {
  user: PropTypes.shape({
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
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      email: PropTypes.string,
    }),
  }).isRequired,
  onLoadUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    user: state.users.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadUser: email => dispatch(actions.fetchUser(email)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UserProfile));
