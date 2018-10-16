import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  media: {
    height: '15rem',
  },
  pos: {
    marginBottom: 12,
  },
};

function UserCard(props) {
  const {
    classes, picture, name, summary,
  } = props;
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={picture}
          title={name}
        />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            {name}
          </Typography>
          <Typography component="p">
            {summary}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          View
        </Button>
      </CardActions>
    </Card>
  );
}

UserCard.defaultProps = {
  picture: null,
};

UserCard.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  picture: PropTypes.string,
  name: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
};

export default withStyles(styles)(UserCard);
