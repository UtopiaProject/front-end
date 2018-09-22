import React from 'react';
import PropTypes from 'prop-types';
import AppsOutlined from '@material-ui/icons/AppsOutlined';
import TuneOutlined from '@material-ui/icons/TuneOutlined';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import ViewListOutlined from '@material-ui/icons/ViewListOutlined';
import {
  Paper,
  Grid,
  Typography,
  IconButton,
  TextField,
} from '@material-ui/core';

const ContainerHeader = (props) => {
  const {
    width,
    headline,
    listAsCards,
    filterClicked,
    searchChanged,
    listingToggled,
  } = props;

  let listAsCardsToggle = null;
  let searchIcon = null;
  if (!(width === 'sm' || width === 'xs')) {
    searchIcon = (
      <Grid item>
        <SearchOutlined />
      </Grid>
    );
    listAsCardsToggle = (
      <Grid item>
        <IconButton onClick={listingToggled}>
          <ViewListOutlined />
        </IconButton>
      </Grid>
    );
    if (listAsCards) {
      listAsCardsToggle = (
        <Grid item>
          <IconButton onClick={listingToggled}>
            <AppsOutlined />
          </IconButton>
        </Grid>
      );
    }
  }

  return (
    <Paper>
      <Grid container spacing={16} alignItems="center" justify="center">
        <Grid item md={12}>
          <Typography variant="headline" align="center">{ headline }</Typography>
        </Grid>
        <Grid item>
          <IconButton onClick={filterClicked}>
            <TuneOutlined />
          </IconButton>
        </Grid>
        {searchIcon}
        <Grid item md={8}>
          <TextField
            placeholder="Pesquisar projetos"
            fullWidth
            onChange={event => searchChanged(event.target.value)}
          />
        </Grid>
        {listAsCardsToggle}
      </Grid>
    </Paper>
  );
};

ContainerHeader.propTypes = {
  width: PropTypes.string.isRequired,
  headline: PropTypes.string.isRequired,
  listAsCards: PropTypes.bool.isRequired,
  filterClicked: PropTypes.func.isRequired,
  searchChanged: PropTypes.func.isRequired,
  listingToggled: PropTypes.func.isRequired,
};

export default ContainerHeader;
