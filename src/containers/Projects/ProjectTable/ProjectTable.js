import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import trim from '../../../helpers/Strings/Trim';
import defaultProjectPicture from '../../../assets/images/defaultProject.png';
import ProjectFundingStatus from '../ProjectFunding/ProjectFundingStatus/ProjectFundingStatus';
import ProjectFundingStatusBar from '../ProjectFunding/ProjectFundingStatus/ProjectFundingStatusBar/ProjectFundingStatusBar';

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

  const projectsRows = (
    projects.map((project) => {
      const {
        id,
        author,
        picture,
        title,
        introduction,
        currency,
        currentFunding,
        fundingTarget,
      } = project;
      return (
        <TableRow key={id}>
          <TableCell>
            <div className={classes.projectRow}>
              <img
                src={picture || defaultProjectPicture}
                alt={trim(title, 10)}
                className={classes.projectPic}
              />
              <div className={classes.projectInfo}>
                <Typography variant="title">{trim(title, 20)}</Typography>
                <Typography variant="body2">{trim(introduction, 50)}</Typography>
              </div>
            </div>
          </TableCell>
          <TableCell>{author}</TableCell>
          <TableCell>
            <ProjectFundingStatus
              currency={currency}
              currentFunding={currentFunding}
              fundingTarget={fundingTarget}
            />
            <ProjectFundingStatusBar
              currentFunding={currentFunding}
              fundingTarget={fundingTarget}
            />
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
      );
    })
  );

  return (
    <Paper className={classes.root}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className={classes.projectHeader}>Sumário</TableCell>
            <TableCell className={classes.projectHeader}>Autor</TableCell>
            <TableCell className={classes.projectHeader}>Financiamento</TableCell>
            <TableCell className={classes.projectHeader}>{}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projectsRows}
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
