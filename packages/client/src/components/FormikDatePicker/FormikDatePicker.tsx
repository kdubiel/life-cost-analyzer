import React from 'react';
import { DatePicker, DatePickerProps } from 'components';
import { useField } from 'formik';

interface Props extends Partial<DatePickerProps> {
  name: string;
  setFieldValue(field: string, value: Date, shouldValidate?: boolean): void;
}

const FormikDatePicker = ({
  name,
  helperText,
  setFieldValue,
  ...otherProps
}: Props) => {
  const [field, { error, touched }] = useField(name);
  const errorMessage = touched && error ? error : null;
  return (
    <DatePicker
      {...otherProps}
      {...field}
      error={!!error && touched}
      helperText={errorMessage || helperText}
      onChange={value => setFieldValue(name, value)}
    />
  );
};

export default FormikDatePicker;
