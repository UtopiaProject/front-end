import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const styles = {
  root: {
    margin: '2rem auto',
  },
  projectHeader: {
    fontSize: '1rem',
  },
  projectRow: {
    display: 'flex',
    fontSize: '1rem',
  },
  projectPic: {
    height: '5rem',
    width: '6rem',
    marginRight: '1rem',
    borderRadius: '4px',
  },
  projectInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
  projectCategories: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0.25rem 0',
  },
};

const ProjectTable = (props) => {
  const { classes, projects } = props;
  return (
    <Paper className={classes.root}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className={classes.projectHeader}>Sumário</TableCell>
            <TableCell className={classes.projectHeader}>Autor</TableCell>
            <TableCell className={classes.projectHeader}>Categoria</TableCell>
            <TableCell className={classes.projectHeader}>{}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.map(project => (
            <TableRow key={project.id}>
              <TableCell>
                <div className={classes.projectRow}>
                  <img src={project.picture} alt={project.title} className={classes.projectPic} />
                  <div className={classes.projectInfo}>
                    <Typography variant="title">{project.title}</Typography>
                    <Typography variant="body2">{project.introduction}</Typography>
                  </div>
                </div>
              </TableCell>
              <TableCell>{project.author}</TableCell>
              <TableCell>
                {
                  project.tags
                    ? project.tags.map(tag => (
                      <Chip
                        key={tag.title}
                        variant="outlined"
                        className={classes.projectCategories}
                        label={tag.title}
                      />
                    ))
                    : null
                }
              </TableCell>
              <TableCell>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  component={Link}
                  to={`/projects/${project.id}`}
                >
                  SAIBA MAIS
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

ProjectTable.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(ProjectTable);
