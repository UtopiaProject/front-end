import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  ListItem,
  Typography,
  withStyles,
  IconButton,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/EditOutlined';

const styles = () => ({
  newsListItem: {
    justifyContent: 'center',
  },
  newsListItemHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class ProjectNewsArticle extends Component {
  state = {
    readOnly: true,
  };

  handleToggleReadOnly = () => {
    const { readOnly } = this.state;
    const updatedDisplay = !readOnly;
    this.setState({ readOnly: updatedDisplay });
  }

  render() {
    const { readOnly } = this.state;
    const { article, classes } = this.props;

    const simpleArticle = (
      <ListItem
        key={article}
        button
        onClick={this.handleToggleReadOnly}
        className={classes.newsListItem}
      >
        <Typography>
          {`${article.title} - ${article.createdAt}`}
        </Typography>
      </ListItem>
    );

    const completeArticle = (
      <ListItem
        key={article}
        button
        onClick={this.handleToggleReadOnly}
        className={classes.newsListItem}
      >
        <Grid container>
          <Grid item xs={12} className={classes.newsListItemHeader}>
            <Typography>
              {`${article.title} - ${article.createdAt}`}
            </Typography>
            <IconButton>
              <EditIcon />
            </IconButton>
          </Grid>
          <Grid item xs={12}>
            <Typography align="center">
              {article.description}
            </Typography>
          </Grid>
        </Grid>
      </ListItem>
    );

    return readOnly ? simpleArticle : completeArticle;
  }
}

ProjectNewsArticle.propTypes = {
  article: PropTypes.shape({}).isRequired,
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(ProjectNewsArticle);
