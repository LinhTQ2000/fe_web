import React from 'react'

import { getIn } from 'formik'
import PropTypes from 'prop-types'

import DateTimePicker from '~/components/DateTimePicker'

const FormikDateTimePicker = ({ form, field, onChange, ...props }) => (
  <DateTimePicker
    {...field}
    value={field.value || null}
    onChange={(v) => {
      onChange(v)
      form.setFieldValue(field.name, v)
    }}
    onTouch={(touched) => {
      form.setFieldTouched(field.name, touched)
    }}
    error={
      !!getIn(form.touched, field.name) && !!getIn(form.errors, field.name)
    }
    helperText={getIn(form.errors, field.name)}
    {...props}
  />
)

FormikDateTimePicker.defaultProps = {
  form: {},
  field: {},
  onChange: () => {},
}

FormikDateTimePicker.propTypes = {
  form: PropTypes.shape(),
  field: PropTypes.shape(),
  onChange: PropTypes.func,
}

export default FormikDateTimePicker
