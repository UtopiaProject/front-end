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
import ProjectFundingStatus from '../../ProjectFunding/ProjectFundingStatus/ProjectFundingStatus';
import ProjectFundingStatusBar from '../../ProjectFunding/ProjectFundingStatus/ProjectFundingStatusBar/ProjectFundingStatusBar';
import trim from '../../../../helpers/Strings/Trim';

const styles = {
  media: {
    height: '15rem',
  },
  pos: {
    marginBottom: 12,
  },
  actionArea: {
    width: '100%',
  },
  button: {
    display: 'flex',
    justifyContent: 'flex-end',
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
    currency,
    currentFunding,
    fundingTarget,
  } = props;
  return (
    <Card>
      <CardActionArea className={classes.actionArea}>
        <CardMedia
          className={classes.media}
          image={picture}
          title={trim(title, 10)}
        />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            {trim(title, 20)}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {author}
          </Typography>
          <Typography component="p">
            {trim(introduction, 30)}
          </Typography>
          <ProjectFundingStatus
            currency={currency}
            currentFunding={currentFunding}
            fundingTarget={fundingTarget}
          />
          <ProjectFundingStatusBar
            currentFunding={currentFunding}
            fundingTarget={fundingTarget}
          />
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.button}>
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
  currentFunding: 0,
  fundingTarget: 0,
};

MediaCard.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  picture: PropTypes.string,
  author: PropTypes.string.isRequired,
  introduction: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  currentFunding: PropTypes.number,
  fundingTarget: PropTypes.number,
};

export default withStyles(styles)(MediaCard);
