import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import UserCard from './UserCard/UserCard';

const UserCards = (props) => {
  const { users } = props;
  console.log('[UserCards] users', users);
  
  return users.map(user => (
    <Grid item md={4} key={user.email}>
      <UserCard
        picture={user.picture}
        name={user.name}
        summary={user.summary}
      />
    </Grid>
  ));
};

UserCards.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
  })).isRequired,
};

export default UserCards;
