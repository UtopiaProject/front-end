
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import Grid from '@material-ui/core/Grid';
import UserTable from './UserTable/UserTable';
import UserCards from './UserCards/UserCards';
import UserFilter from './UserFilter/UserFilter';
import * as actions from '../../store/actions';
import ContainerHeader from '../../components/ContainerHeader/ContainerHeader';

const styles = theme => ({
  root: {
    padding: '2rem',
    margin: 'auto',
    [theme.breakpoints.up('md')]: {
      maxWidth: '60%',
    },
  },
  listing: {
    marginTop: '1rem',
  },
});

class Users extends Component {
  state = {
    listAsCards: false,
    displayFilters: false,
  };

  componentDidMount() {
    const { onPageLoad } = this.props;
    onPageLoad();
  }

  handleToggleListing = () => {
    const { listAsCards } = this.state;
    const currentListing = listAsCards;
    this.setState({ listAsCards: !currentListing });
  }

  handleClickFilters = () => {
    const { displayFilters } = this.state;
    const currentDisplay = displayFilters;
    this.setState({ displayFilters: !currentDisplay });
  }

  render() {
    const {
      classes,
      width,
      users,
      onFilterUsersByName,
    } = this.props;
    const { listAsCards, displayFilters } = this.state;

    let usersList = null;
    if (users && ((width === 'sm' || width === 'xs') || listAsCards)) {
      usersList = <UserCards users={users} />;
    } else if (users && !listAsCards) {
      usersList = <UserTable users={users} />;
    }
    return (
      <Grid
        container
        spacing={16}
        alignItems="center"
        justify="center"
        className={classes.root}
      >
        <Grid item md={12}>
          <ContainerHeader
            headline="Users"
            listAsCards={listAsCards}
            filterClicked={this.handleClickFilters}
            searchChanged={onFilterUsersByName}
            listingToggled={this.handleToggleListing}
            width={width}
          />
        </Grid>
        <Grid item md={12}>
          <Grid
            container
            spacing={40}
            justify="center"
            alignItems="center"
            className={classes.listing}
          >
            {usersList}
          </Grid>
        </Grid>
        <UserFilter
          open={displayFilters}
          ModalProps={{ onBackdropClick: this.handleClickFilters }}
        />
      </Grid>
    );
  }
}

Users.defaultProps = {
  users: null,
};

Users.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  width: PropTypes.string.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({})),
  onPageLoad: PropTypes.func.isRequired,
  onFilterUsersByName: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    users: state.users.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPageLoad: () => dispatch(actions.fetchUsers()),
    onFilterUsersByName: name => dispatch(actions.filterUsersByName(name)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withWidth()(withStyles(styles)(Users)),
);
