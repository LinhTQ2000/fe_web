import { Checkbox } from '@mui/material'
import PropTypes from 'prop-types'
import { Controller, useFormContext } from 'react-hook-form'

const FormCheckBox = ({ name, onChange, ...props }) => {
  const { control } = useFormContext()
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange: onChangeField, value } }) => {
        return (
          <Checkbox
            {...props}
            checked={value}
            onChange={(e) => {
              onChangeField(e)
              onChange(e.target.checked)
            }}
          />
        )
      }}
    />
  )
}

FormCheckBox.defaultProps = {
  onChange: () => {},
}

FormCheckBox.propTypes = {
  onChange: PropTypes.func,
}

export default FormCheckBox
