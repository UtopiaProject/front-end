import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import {
  withStyles,
  IconButton,
  Paper,
  List,
  Grid,
  Typography,
} from '@material-ui/core';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import { updateObject, checkValidity } from '../../../helpers/Validation/Validation';
import * as actions from '../../../store/actions';
import AddButton from '../../../components/Buttons/AddButton/AddButton';
import CreateButton from '../../../components/Buttons/CreateButton/CreateButton';
import Input from '../../../components/Input/Input';
import ProjectNewsArticle from './ProjectNewsArticle/ProjectNewsArticle';

const styles = theme => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 55,
  },
  newsForm: {
    padding: '0 1rem',
  },
  newsFormHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

class ProjectNews extends Component {
  state = {
    addingNews: false,
    newsForm: {
      title: {
        elementType: 'text',
        elementConfig: {
          type: 'text',
          label: 'Título da notícia',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        gridSizing: {
          xs: 12,
          sm: false,
          md: false,
          lg: false,
          xl: false,
        },
      },
      description: {
        elementType: 'textarea',
        elementConfig: {
          type: 'text',
          label: 'Descrição da notícia',
          rowsMax: '4',
          rows: '4',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        gridSizing: {
          xs: 12,
          sm: false,
          md: false,
          lg: false,
          xl: false,
        },
      },
    },
    formIsValid: false,
  };

  componentDidMount() {
    const { onFetchNewsArticles, projectId } = this.props;
    onFetchNewsArticles(projectId);
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const { newsForm } = this.state;
    const updatedFormElement = updateObject(newsForm[inputIdentifier], {
      value: event.target.value,
      valid: checkValidity(event.target.value, newsForm[inputIdentifier].validation),
      touched: true,
    });

    const updatedNewsForm = updateObject(newsForm, {
      [inputIdentifier]: updatedFormElement,
    });

    let formIsValid = true;
    Object.keys(updatedNewsForm).forEach((input) => {
      formIsValid = updatedNewsForm[input].valid && formIsValid;
    });

    this.setState({ newsForm: updatedNewsForm, formIsValid });
  };

  handleSaveNews = () => {
    const { newsForm, formIsValid } = this.state;
    const {
      newsArticle,
      projectId,
      onCreateNewsArticle,
      onUpdateNewsArticle,
    } = this.props;

    const newsInfo = {};
    Object.keys(newsForm).forEach((key) => {
      newsInfo[key] = newsForm[key].value;
    });
    newsInfo.createdAt = new Date().toLocaleString();
    newsInfo.projectId = projectId;

    // If there's a loaded project, update it
    if (formIsValid) {
      if (newsArticle) {
        newsInfo.id = newsArticle.id;
        onUpdateNewsArticle(newsInfo);
        this.handleToggleNewsForm();
        this.handleResetForm();
      }
      onCreateNewsArticle(newsInfo);
      this.handleToggleNewsForm();
      this.handleResetForm();
    }
  };

  handleResetForm = () => {
    const { newsForm } = this.state;
    const resetNewsForm = _.cloneDeep(newsForm);
    Object.keys(resetNewsForm).forEach((key) => {
      resetNewsForm[key].value = '';
    });
    this.setState({ newsForm: resetNewsForm });
  };

  handleToggleNewsForm = () => {
    const { addingNews } = this.state;
    const toggleState = !addingNews;
    this.setState({ addingNews: toggleState });
  };

  render() {
    const { classes, newsArticles } = this.props;
    const { addingNews, newsForm } = this.state;

    const formElements = Object.keys(newsForm).map((e) => {
      return {
        id: e,
        config: newsForm[e],
      };
    });

    const form = formElements.map(e => (
      <Input
        key={e.id}
        element={e.config}
        changed={event => this.inputChangedHandler(event, e.id)}
      />
    ));

    const saveButton = addingNews
      ? <CreateButton clicked={this.handleSaveNews} className={classes.fab} />
      : <AddButton clicked={this.handleToggleNewsForm} className={classes.fab} />;

    return (
      <div>
        <Grid container>
          <Grid item xs={12}>
            <Paper>
              <List component="nav">
                {
                  addingNews
                    ? (
                      <Grid container className={classes.newsForm}>
                        <Grid item xs={12} className={classes.newsFormHeader}>
                          <Typography variant="headline">
                            Nova Notícia
                          </Typography>
                          <IconButton aria-label="Cancel">
                            <CloseOutlinedIcon onClick={this.handleToggleNewsForm} />
                          </IconButton>
                        </Grid>
                        <Grid item xs={12}>
                          {form}
                        </Grid>
                      </Grid>
                    )
                    : null
                }
                {
                  newsArticles
                    ? newsArticles.reverse().map(article => (
                      <ProjectNewsArticle article={article} />
                    ))
                    : <Typography align="center">Nenhuma notícia encontrada</Typography>
                }
              </List>
            </Paper>
          </Grid>
        </Grid>
        {saveButton}
      </div>
    );
  }
}

ProjectNews.defaultProps = {
  newsArticle: null,
  newsArticles: null,
  error: null,
};

ProjectNews.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  projectId: PropTypes.string.isRequired,
  newsArticle: PropTypes.shape({}),
  newsArticles: PropTypes.shape({}),
  error: PropTypes.shape({}),
  onCreateNewsArticle: PropTypes.func.isRequired,
  onFetchNewsArticles: PropTypes.func.isRequired,
  onUpdateNewsArticle: PropTypes.func.isRequired,
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
    onCreateNewsArticle: newsArticleData => (
      dispatch(actions.createNewsArticle(newsArticleData))
    ),
    onUpdateNewsArticle: newsArticleData => (
      dispatch(actions.updateNewsArticle(newsArticleData))
    ),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(ProjectNews));
