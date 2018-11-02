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
import { Link } from 'react-router-dom';

const styles = {
  media: {
    height: '15rem',
  },
  pos: {
    marginBottom: 12,
  },
};

function MediaCard(props) {
  const {
    classes,
    id,
    picture,
    author,
    introduction,
    title,
  } = props;
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={picture}
          title={title}
        />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            {title}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {author}
          </Typography>
          <Typography component="p">
            {introduction}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          color="primary"
          variant="contained"
          component={Link}
          to={`/projects/${id}`}
        >
          SAIBA MAIS
        </Button>
      </CardActions>
    </Card>
  );
}

MediaCard.defaultProps = {
  picture: null,
};

MediaCard.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  picture: PropTypes.string,
  author: PropTypes.string.isRequired,
  introduction: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default withStyles(styles)(MediaCard);
