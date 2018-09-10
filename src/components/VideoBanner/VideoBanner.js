import React from 'react';
import utopiaBanner from '../../assets/videos/utopia-banner.mp4';
import cssClasses from './VideoBanner.css';

const VideoBanner = () => (
  <div className={cssClasses.VideoBlock}>
    <video src={utopiaBanner} autoPlay loop muted />
    <div className={cssClasses.VideoBlock__coverText}>
      <h2>UTOPIA</h2>
      <p>soluções humanitárias a longo prazo</p>
    </div>
  </div>
);

export default VideoBanner;
