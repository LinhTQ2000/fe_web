import React from 'react'

import PropTypes from 'prop-types'
import { Controller, useFormContext } from 'react-hook-form'

import DatePicker from '~/components/DatePicker'

const FormDatePicker = ({ name, onChange, ...props }) => {
  const { control } = useFormContext()
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange: onChangeField, value },
        fieldState: { error },
      }) => {
        return (
          <DatePicker
            {...props}
            helperText={error ? error.message : null}
            error={!!error}
            value={value}
            onChange={(v) => {
              onChangeField(v)
              onChange(v)
            }}
          />
        )
      }}
    />
  )
}

FormDatePicker.defaultProps = {
  onChange: () => {},
}

FormDatePicker.propTypes = {
  onChange: PropTypes.func,
}

export default FormDatePicker
