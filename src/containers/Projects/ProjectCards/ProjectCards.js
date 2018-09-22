import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import ProjectCard from './ProjectCard/ProjectCard';

const ProjectCards = (props) => {
  const { projects } = props;

  return projects.map(project => (
    <Grid item md={4} key={project.id}>
      <ProjectCard
        picture={project.picture}
        author={project.author}
        introduction={project.introduction}
        title={project.title}
      />
    </Grid>
  ));
};

ProjectCards.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default ProjectCards;
