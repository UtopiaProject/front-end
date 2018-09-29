import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import agriculturePic from '../../assets/images/agriculture.jpg';
import educationPic from '../../assets/images/education.jpg';
import foodPic from '../../assets/images/food.jpg';
import greenEnergyPic from '../../assets/images/green-energy.jpg';
import medicinePic from '../../assets/images/medicine.jpg';
import prostheticsPic from '../../assets/images/prosthetics.jpg';
import sanitationPic from '../../assets/images/sanitation.jpg';
import transportPic from '../../assets/images/transport.jpg';
import CoreCategory from './CoreCategory/CoreCategory';

const styles = () => ({
  sectionHeader: {
    fontSize: '3rem',
    textAlign: 'center',
    color: 'green',
  },
});

const categories = [
  { title: 'Agricultura', pic: agriculturePic },
  { title: 'Educação', pic: educationPic },
  { title: 'Alimentação', pic: foodPic },
  { title: 'Energia', pic: greenEnergyPic },
  { title: 'Medicina', pic: medicinePic },
  { title: 'Automação', pic: prostheticsPic },
  { title: 'Saneamento', pic: sanitationPic },
  { title: 'Transporte', pic: transportPic },
];

const CoreCategories = (props) => {
  const { classes } = props;
  const coreCategories = categories.map(category => (
    <CoreCategory key={category.title} title={category.title} pic={category.pic} />
  ));

  return (
    <Grid container spacing={40}>
      <Grid item xs={12}>
        <h2 className={classes.sectionHeader}>Categorias</h2>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={16}>
          {coreCategories}
        </Grid>
      </Grid>
    </Grid>
  );
};

CoreCategories.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(CoreCategories);
