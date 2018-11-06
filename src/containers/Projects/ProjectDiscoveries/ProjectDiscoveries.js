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
  discoveriesHeader: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '1rem',
  },
  discoveriesContainer: {
    padding: '1rem',
  },
});

class ProjectDiscoveries extends Component {
  state = {
    editorHtml: '',
  };

  componentDidMount() {
    const { projectId, onLoadDiscovery } = this.props;
    onLoadDiscovery(projectId);
  }

  componentDidUpdate(prevProps) {
    const { projectId, discovery, onLoadDiscovery } = this.props;
    const prevDiscoveryExists = prevProps.discovery;
    if (prevDiscoveryExists) {
      const prevDescription = prevProps.discovery.description;
      const currentDescription = discovery.description;
      if (prevDescription !== currentDescription) {
        onLoadDiscovery(projectId);
      }
    }
  }

  handleSaveDiscovery = () => {
    const { editorHtml } = this.state;
    const {
      projectId,
      onUpdateDiscovery,
    } = this.props;

    const discoveryData = {};
    discoveryData.description = editorHtml;
    discoveryData.projectId = projectId;
    discoveryData.updatedAt = new Date().toLocaleString();

    onUpdateDiscovery(discoveryData);
  }

  handleBodyChange = (editorHtml) => {
    this.setState({ editorHtml });
  }

  render() {
    const { editorHtml } = this.state;
    const { classes, discovery } = this.props;

    return (
      <Grid container>
        <Grid item xs={12}>
          <Grid item xs={12} className={classes.discoveriesHeader}>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.handleSaveDiscovery}
            >
              SALVAR
            </Button>
          </Grid>
          <Grid item xs={12}>
            <ReactQuill
              onChange={this.handleBodyChange}
              value={editorHtml}
              modules={ProjectDiscoveries.modules}
              formats={ProjectDiscoveries.formats}
              placeholder="bla"
            />
          </Grid>
          <Grid item xs={12} className={classes.discoveriesContainer}>
            {discovery && <div dangerouslySetInnerHTML={{ __html: discovery.description }} />}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

ProjectDiscoveries.modules = {
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

ProjectDiscoveries.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video',
];

ProjectDiscoveries.defaultProps = {
  discovery: null,
  error: null,
};

ProjectDiscoveries.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  projectId: PropTypes.string.isRequired,
  discovery: PropTypes.shape({}),
  error: PropTypes.shape({}),
  onLoadDiscovery: PropTypes.func.isRequired,
  onUpdateDiscovery: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    discovery: state.discoveries.discovery,
    error: state.discoveries.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadDiscovery: discovery => dispatch(actions.fetchDiscovery(discovery)),
    onUpdateDiscovery: discovery => dispatch(actions.updateDiscovery(discovery)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(ProjectDiscoveries));
