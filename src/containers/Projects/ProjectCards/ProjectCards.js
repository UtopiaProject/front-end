import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import ProjectCard from './ProjectCard/ProjectCard';

const ProjectCards = (props) => {
  const { projects } = props;

  return projects.map((project) => {
    const {
      id,
      picture,
      author,
      introduction,
      title,
      currency,
      currentFunding,
      fundingTarget,
    } = project;
    return (
      <Grid item md={4} key={id}>
        <ProjectCard
          id={id}
          picture={picture}
          author={author}
          introduction={introduction}
          title={title}
          currency={currency}
          currentFunding={currentFunding}
          fundingTarget={fundingTarget}
        />
      </Grid>
    );
  });
};

ProjectCards.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default ProjectCards;
