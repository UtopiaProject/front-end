import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Grid, Typography, Card, CardMedia, CardContent, CardActionArea,
} from '@material-ui/core';

const styles = {
  media: {
    objectFit: 'cover',
  },
  card: {
    maxWidth: '100%',
    margin: '1rem',
  },
};

const CoreCategory = (props) => {
  const { classes, pic, title } = props;

  return (
    <Grid item xs={12} md={3}>
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            component="img"
            className={classes.media}
            height="220"
            image={pic}
            title={title}
          />
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
              {title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

CoreCategory.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  pic: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default withStyles(styles)(CoreCategory);
