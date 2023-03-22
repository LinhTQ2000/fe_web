import React from 'react'

import PropTypes from 'prop-types'
import { Controller, useFormContext } from 'react-hook-form'

import DateRangePicker from '~/components/DateRangePicker'

const FormDateRangePicker = ({ name, onChange, ...props }) => {
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
          <DateRangePicker
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

FormDateRangePicker.defaultProps = {
  onChange: () => {},
}

FormDateRangePicker.propTypes = {
  onChange: PropTypes.func,
}

export default FormDateRangePicker
