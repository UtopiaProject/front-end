import * as actionTypes from '../actions/actionTypes';

const initialState = {
  newsArticle: null,
  error: null,
};

const createNewsArticleSuccess = (state, action) => {
  return {
    ...state,
    newsArticle: action.newsArticle,
  };
};

const createNewsArticleFailure = (state, action) => {
  return {
    ...state,
    error: action.error,
  };
};

const fetchNewsArticleSuccess = (state, action) => {
  return {
    ...state,
    newsArticle: action.newsArticle,
  };
};

const fetchNewsArticleFailure = (state, action) => {
  return {
    ...state,
    error: action.error,
  };
};

const fetchNewsArticlesSuccess = (state, action) => {
  return {
    ...state,
    newsArticles: action.newsArticles,
  };
};

const fetchNewsArticlesFailure = (state, action) => {
  return {
    ...state,
    error: action.error,
  };
};

const updateNewsArticleSuccess = (state, action) => {
  return {
    ...state,
    newsArticle: action.newsArticle,
  };
};

const updateNewsArticleFailure = (state, action) => {
  return {
    ...state,
    error: action.error,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_NEWS_ARTICLE_SUCCESS: return createNewsArticleSuccess(state, action);
    case actionTypes.CREATE_NEWS_ARTICLE_FAILURE: return createNewsArticleFailure(state, action);
    case actionTypes.FETCH_NEWS_ARTICLES_SUCCESS: return fetchNewsArticlesSuccess(state, action);
    case actionTypes.FETCH_NEWS_ARTICLES_FAILURE: return fetchNewsArticlesFailure(state, action);
    case actionTypes.FETCH_NEWS_ARTICLE_SUCCESS: return fetchNewsArticleSuccess(state, action);
    case actionTypes.FETCH_NEWS_ARTICLE_FAILURE: return fetchNewsArticleFailure(state, action);
    case actionTypes.UPDATE_NEWS_ARTICLE_SUCCESS: return updateNewsArticleSuccess(state, action);
    case actionTypes.UPDATE_NEWS_ARTICLE_FAILURE: return updateNewsArticleFailure(state, action);
    default: return state;
  }
};

export default reducer;
