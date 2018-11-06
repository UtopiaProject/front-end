import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  Grid,
  Button,
  withStyles,
} from '@material-ui/core';
import * as actions from '../../../store/actions';

const styles = () => ({
  referencesHeader: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '1rem',
  },
  referencesContainer: {
    padding: '1rem',
  },
});

class ProjectReferences extends Component {
  state = {
    editorHtml: '',
  };

  componentDidMount() {
    const { projectId, onLoadReference } = this.props;
    onLoadReference(projectId);
  }

  componentDidUpdate(prevProps) {
    const { projectId, reference, onLoadReference } = this.props;
    const prevReferenceExists = prevProps.reference;
    if (prevReferenceExists) {
      const prevDescription = prevProps.reference.description;
      const currentDescription = reference.description;
      if (prevDescription !== currentDescription) {
        onLoadReference(projectId);
      }
    }
  }

  handleSaveReference = () => {
    const { editorHtml } = this.state;
    const {
      projectId,
      onUpdateReference,
    } = this.props;

    const referenceData = {};
    referenceData.description = editorHtml;
    referenceData.projectId = projectId;
    referenceData.updatedAt = new Date().toLocaleString();

    onUpdateReference(referenceData);
  }

  handleBodyChange = (editorHtml) => {
    this.setState({ editorHtml });
  }

  render() {
    const { editorHtml } = this.state;
    const { classes, reference } = this.props;

    return (
      <Grid container>
        <Grid item xs={12}>
          <Grid item xs={12} className={classes.referencesHeader}>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.handleSaveReference}
            >
              SALVAR
            </Button>
          </Grid>
          <Grid item xs={12}>
            <ReactQuill
              onChange={this.handleBodyChange}
              value={editorHtml}
              modules={ProjectReferences.modules}
              formats={ProjectReferences.formats}
              placeholder="bla"
            />
          </Grid>
          <Grid item xs={12} className={classes.referencesContainer}>
            {reference && <div dangerouslySetInnerHTML={{ __html: reference.description }} />}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

ProjectReferences.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' },
      { indent: '-1' }, { indent: '+1' }],
    ['link', 'image', 'video'],
    ['clean'],
  ],
};

ProjectReferences.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video',
];

ProjectReferences.defaultProps = {
  reference: null,
  error: null,
};

ProjectReferences.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  projectId: PropTypes.string.isRequired,
  reference: PropTypes.shape({}),
  error: PropTypes.shape({}),
  onLoadReference: PropTypes.func.isRequired,
  onUpdateReference: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    reference: state.references.reference,
    error: state.references.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadReference: reference => dispatch(actions.fetchReference(reference)),
    onUpdateReference: reference => dispatch(actions.updateReference(reference)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(ProjectReferences));
