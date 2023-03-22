import PropTypes from 'prop-types'
import { Controller, useFormContext } from 'react-hook-form'

import Autocomplete from '../Autocomplete'

const FormAutoComplete = ({ name, onChange, ...props }) => {
  const { control } = useFormContext()
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange: onChangeField, value, onBlur },
        fieldState: { error },
      }) => {
        return (
          <Autocomplete
            {...props}
            helperText={error ? error.message : null}
            error={!!error}
            value={value}
            onChange={(e, val) => {
              onChangeField(e)
              onChange(val)
            }}
            onBlur={onBlur}
          />
        )
      }}
    />
  )
}

FormAutoComplete.defaultProps = {
  onChange: () => {},
}

FormAutoComplete.propTypes = {
  onChange: PropTypes.func,
}

export default FormAutoComplete
