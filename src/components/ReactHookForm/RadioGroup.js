import { RadioGroup } from '@mui/material'
import PropTypes from 'prop-types'
import { Controller, useFormContext } from 'react-hook-form'

const FormRadioGroup = ({ name, onChange, ...props }) => {
  const { control } = useFormContext()
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange: onChangeField, value } }) => {
        return (
          <RadioGroup
            {...props}
            checked={value}
            onChange={(e, val) => {
              onChangeField(e)
              onChange(val)
            }}
          />
        )
      }}
    />
  )
}

FormRadioGroup.defaultProps = {
  onChange: () => {},
}

FormRadioGroup.propTypes = {
  onChange: PropTypes.func,
}

export default FormRadioGroup
