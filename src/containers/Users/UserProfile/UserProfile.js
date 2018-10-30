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
  card: {
    margin: '3rem 0',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    padding: '1rem',
    textAlign: 'center',
  },
});

class UserProfile extends Component {
  componentDidMount() {
    const { onLoadUser, match: { params: { email } } } = this.props;
    onLoadUser(email);
  }

  render() {
    const { classes, user } = this.props;

    if (!user) { return null; }
    const {
      name,
      birthdate,
      gender,
      email,
      lattes,
      linkedin,
      stackOverflow,
      summary,
      type,
    } = user;
    return (
      <Grid
        container
        spacing={40}
        alignItems="center"
        justify="center"
      >
        <Grid item xs={6}>
          <Paper className={classes.card}>
            <img src={emailToGravatar(email)} alt={name} />
            <Typography variant="title">
              {name}
            </Typography>
            <Typography variant="body1">
              {`${type} - ${gender} - ${birthdate}`}
            </Typography>
            <Typography variant="subheading">
              {email}
            </Typography>
            <Typography variant="body1">
              {summary}
            </Typography>
            {
              lattes
                ? (
                  <Typography variant="body1">
                    {`Lattes: ${lattes}`}
                  </Typography>
                )
                : null
            }
            {
              linkedin
                ? (
                  <Typography variant="body1">
                    {`Linkedin: ${linkedin}`}
                  </Typography>
                )
                : null
            }
            {
              stackOverflow
                ? (
                  <Typography variant="body1">
                    {`StackOverflow: ${stackOverflow}`}
                  </Typography>
                )
                : null
            }
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
  classes: PropTypes.shape({}).isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
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
