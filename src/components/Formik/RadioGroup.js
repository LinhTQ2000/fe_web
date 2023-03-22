import React from 'react'

import { Box, Typography } from '@mui/material'
import RadioGroup from '@mui/material/RadioGroup'
import PropTypes from 'prop-types'

import LabelValue from '../LabelValue'

const FormikRadioGroup = ({
  field,
  form,
  onChange,
  label,
  sx,
  children,
  required,
  ...props
}) => (
  <RadioGroup
    {...field}
    value={field.value}
    onChange={(_, value) => {
      onChange(value)
      form.setFieldValue(field.name, value)
    }}
    {...props}
  >
    <Box {...sx}>
      {label && (
        <LabelValue
          label={
            <Typography>
              {label}
              {required && (
                <Typography color="error" component="span" ml="3px">
                  *
                </Typography>
              )}
            </Typography>
          }
        />
      )}
      {children}
    </Box>
  </RadioGroup>
)

FormikRadioGroup.defaultProps = {
  field: {},
  form: {},
  required: false,
  onChange: () => {},
}

FormikRadioGroup.propTypes = {
  field: PropTypes.shape(),
  form: PropTypes.shape(),
  sx: PropTypes.object,
  label: PropTypes.string,
  children: PropTypes.node,
  onChange: PropTypes.func,
  required: PropTypes.bool,
}

export default FormikRadioGroup
