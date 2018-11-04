import * as actionTypes from './actionTypes';
import { newsArticles } from '../firebase';

const createNewsArticleFailure = (error) => {
  return {
    type: actionTypes.CREATE_NEWS_ARTICLE_FAILURE,
    error,
  };
};

export const createNewsArticle = (newsArticle) => {
  return (dispatch) => {
    newsArticles.doCreateNewsArticle(newsArticle)
      .catch((error) => {
        dispatch(createNewsArticleFailure(error));
      });
  };
};

const fetchNewsArticleSuccess = (newsArticle) => {
  return {
    type: actionTypes.FETCH_NEWS_ARTICLE_SUCCESS,
    newsArticle,
  };
};

const fetchNewsArticleFailure = (error) => {
  return {
    type: actionTypes.FETCH_NEWS_ARTICLE_FAILURE,
    error,
  };
};

export const fetchNewsArticle = (id, projectId) => {
  return (dispatch) => {
    newsArticles.doReadNewsArticle(id, projectId)
      .then((snapshot) => {
        const NewsArticleValue = Object.values(snapshot.val())[0];
        dispatch(fetchNewsArticleSuccess(NewsArticleValue));
      })
      .catch((error) => {
        dispatch(fetchNewsArticleFailure(error));
      });
  };
};

const fetchNewsArticlesSuccess = (snapshot) => {
  let newsArticleList;
  if (snapshot.val()) {
    newsArticleList = Object.values(snapshot.val());
  }
  return {
    type: actionTypes.FETCH_NEWS_ARTICLES_SUCCESS,
    newsArticles: newsArticleList,
  };
};

export const fetchNewsArticles = (projectId) => {
  return (dispatch) => {
    newsArticles.doReadNewsArticles(dispatch, fetchNewsArticlesSuccess, projectId);
  };
};

const updateNewsArticleFailure = (error) => {
  return {
    type: actionTypes.UPDATE_NEWS_ARTICLE_FAILURE,
    error,
  };
};

export const updateNewsArticle = (newsArticle) => {
  return (dispatch) => {
    newsArticles.doUpdateNewsArticle(newsArticle)
      .catch((error) => {
        dispatch(updateNewsArticleFailure(error));
      });
  };
};
