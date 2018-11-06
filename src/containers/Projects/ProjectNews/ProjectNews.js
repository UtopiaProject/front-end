import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  List,
  Grid,
  Typography,
} from '@material-ui/core';
import * as actions from '../../../store/actions';
import ProjectNewsArticle from './ProjectNewsArticle/ProjectNewsArticle';
import ProjectNewsForm from './ProjectNewsForm/ProjectNewsForm';

class ProjectNews extends Component {
  componentDidMount() {
    const { onFetchNewsArticles, projectId } = this.props;
    onFetchNewsArticles(projectId);
  }

  render() {
    const { newsArticles, projectId } = this.props;

    return (
      <Grid container>
        <Grid item xs={12}>
          <List component="nav">
            <ProjectNewsForm projectId={projectId} />
            {
              newsArticles
                ? newsArticles.reverse().map(article => (
                  <ProjectNewsArticle key={article.createdAt} article={article} />
                ))
                : <Typography align="center">Nenhuma notícia encontrada</Typography>
            }
          </List>
        </Grid>
      </Grid>
    );
  }
}

ProjectNews.defaultProps = {
  newsArticle: null,
  newsArticles: null,
  error: null,
};

ProjectNews.propTypes = {
  projectId: PropTypes.string.isRequired,
  newsArticle: PropTypes.shape({}),
  newsArticles: PropTypes.arrayOf(PropTypes.shape({})),
  error: PropTypes.shape({}),
  onFetchNewsArticles: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    newsArticles: state.newsArticles.newsArticles,
    error: state.newsArticles.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchNewsArticle: (newsArticleId, projectId) => (
      dispatch(actions.fetchNewsArticle(newsArticleId, projectId))
    ),
    onFetchNewsArticles: projectId => (
      dispatch(actions.fetchNewsArticles(projectId))
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectNews);
