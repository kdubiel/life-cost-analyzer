import React from 'react';
import {
  DatePicker as MaterialDatePicker,
  DatePickerProps as MaterialDatePickerProps,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

export interface DatePickerProps extends MaterialDatePickerProps {}

const DatePicker = (props: DatePickerProps) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <MaterialDatePicker {...props} />
    </MuiPickersUtilsProvider>
  );
};

export default DatePicker;
