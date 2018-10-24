import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import UserCard from './UserCard/UserCard';
import emailToGravatar from '../../../helpers/Gravatar/Gravatar';

const UserCards = (props) => {
  const { users } = props;
  return users.map(user => (
    <Grid item md={4} key={user.email}>
      <UserCard
        picture={emailToGravatar(user.email, 300)}
        name={user.name}
        summary={user.summary}
        email={user.email}
      />
    </Grid>
  ));
};

UserCards.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
  })).isRequired,
};

export default UserCards;
