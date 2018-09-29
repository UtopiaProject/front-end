import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import utopiaBanner from '../../assets/videos/utopia-banner.mp4';

const styles = theme => ({
  videoStyle: {
    position: 'relative',
    zIndex: '-1',
    objectFit: 'cover',
    minHeight: '20vh',
    height: '100%',
    width: '100%',
  },
  coverTextStyle: {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
    fontSize: '1rem',
    marginBottom: '0',
    top: '15%',
    left: '0',
    [theme.breakpoints.up('md')]: {
      top: '30%',
      left: '0',
      fontSize: '3rem',
    },
  },
});

const VideoBanner = (props) => {
  const { classes } = props;
  return (
    <div className="VideoBlock">
      <video className={classes.videoStyle} src={utopiaBanner} autoPlay loop muted />
      <div className={classes.coverTextStyle}>
        <h2>UTOPIA</h2>
        <p>soluções humanitárias a longo prazo</p>
      </div>
    </div>
  );
};

VideoBanner.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(VideoBanner);
