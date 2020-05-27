import React from 'react';
import { RouteComponentProps } from 'react-router';
import PopulatedEntryForm from './PopulatedEntryForm/PopulatedEntryForm';
import { Grid } from '@material-ui/core';

interface Params {
  id: string;
}

interface Props extends RouteComponentProps<Params> {}

const Entry = ({
  match: {
    params: { id },
  },
}: Props) => {
  return (
    <Grid container spacing={2} justify="center">
      <Grid item xs={6}>
        <PopulatedEntryForm _id={id} />
      </Grid>
    </Grid>
  );
};

export default Entry;
