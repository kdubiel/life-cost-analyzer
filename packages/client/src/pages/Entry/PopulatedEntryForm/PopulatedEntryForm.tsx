import { Grid } from '@material-ui/core';
import { Form, Formik } from 'formik';
import { AppStore } from 'interfaces';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Entry, EntryDto, entryYupSchema } from 'shared';
import {
  createEntry,
  selectLoadingEntryState,
  updateEntry,
} from 'store/entries';
import { FormikTextField, Button, FormikDatePicker } from 'components';
import { Redirect } from 'react-router-dom';

interface Props {
  _id?: string;
}

const formModel: EntryDto = {
  category: '',
  date: new Date(),
  description: '',
  value: 0,
};

const PopulatedEntryForm = ({ _id }: Props) => {
  const dispatch = useDispatch();
  const entry: Entry | undefined = useSelector<AppStore, Entry | undefined>(
    store => store.entities.entry.byId[_id || '']
  );
  const loading = useSelector(selectLoadingEntryState);

  const onSubmit = (data: EntryDto) => {
    if (entry && _id) {
      return dispatch(updateEntry(_id, data));
    }

    dispatch(createEntry(data));
  };

  if (_id && !entry) {
    return <Redirect to="/" />;
  }

  return (
    <Formik
      initialValues={{
        ...formModel,
        ...(entry || {}),
      }}
      onSubmit={data => {
        onSubmit(data);
      }}
      enableReinitialize
      validationSchema={entryYupSchema}
    >
      {({ setFieldValue }) => {
        return (
          <Form>
            <h1>{entry ? 'Edit' : 'Create'} Entry</h1>
            <Grid container justify="center">
              <Grid item xs={12}>
                <FormikDatePicker
                  margin="normal"
                  required
                  fullWidth
                  label="Date"
                  id="date"
                  name="date"
                  format="dd/MM/yyyy"
                  setFieldValue={setFieldValue}
                />
              </Grid>
              <Grid item xs={12}>
                <FormikTextField
                  margin="normal"
                  required
                  fullWidth
                  label="Category"
                  id="category"
                  name="category"
                />
              </Grid>
              <Grid item xs={12}>
                <FormikTextField
                  type="number"
                  margin="normal"
                  required
                  fullWidth
                  label="Value"
                  id="value"
                  name="value"
                  inputProps={{
                    step: 1,
                    min: 0,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormikTextField
                  margin="normal"
                  fullWidth
                  label="Description"
                  id="description"
                  name="description"
                  multiline
                />
              </Grid>
              <Grid item xs={3}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  isLoading={loading}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default PopulatedEntryForm;
