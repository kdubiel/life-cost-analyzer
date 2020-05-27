import React from 'react';
import { Grid } from '@material-ui/core';
import PopulatedEntryList from './PopulatedEntryList/PopulatedEntryList';
import PopulatedStatisticsChart from './PopulatedStatisticsChart/PopulatedStatisticsChart';

interface Props {}

const Home = (_props: Props) => {
  return (
    <Grid container spacing={2} justify="center">
      <Grid item xs={8}>
        <PopulatedEntryList />
      </Grid>
      <Grid item xs={8}>
        <PopulatedStatisticsChart />
      </Grid>
    </Grid>
  );
};

export default Home;
