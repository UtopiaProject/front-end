import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';

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

const UserTable = (props) => {
  const { classes, users } = props;

  return (
    <Paper className={classes.root}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className={classes.projectHeader}>Sumário</TableCell>
            <TableCell className={classes.projectHeader}>Email</TableCell>
            <TableCell className={classes.projectHeader}>Áreas</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(user => (
            <TableRow key={user.email}>
              <TableCell>
                <div className={classes.projectRow}>
                  <img src={user.picture} alt={user.name} className={classes.projectPic} />
                  <div className={classes.projectInfo}>
                    <Typography variant="title">{user.name}</Typography>
                    <Typography variant="body2">{user.summary}</Typography>
                  </div>
                </div>
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                {user.tags
                  ? user.tags.map(tag => (
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

UserTable.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(UserTable);
