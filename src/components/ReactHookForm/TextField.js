import PropTypes from 'prop-types'
import { Controller, useFormContext } from 'react-hook-form'

import TextField from '../TextField'

const FormTextField = ({ name, onChange, onInput, ...props }) => {
  const { control } = useFormContext()
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: true }}
      shouldUseNativeValidation={true}
      render={({
        field: { onChange: onChangeField, value, onBlur },
        fieldState: { error },
      }) => {
        return (
          <TextField
            {...props}
            helperText={error ? error.message : null}
            error={!!error}
            value={value}
            onChange={(e, val) => {
              if (typeof onInput === 'function') {
                onInput(e)
              } else {
                onChangeField(e)
                onChange(val)
              }
            }}
            onBlur={onBlur}
          />
        )
      }}
    />
  )
}

FormTextField.defaultProps = {
  onChange: () => {},
}

FormTextField.propTypes = {
  onChange: PropTypes.func,
}

export default FormTextField
