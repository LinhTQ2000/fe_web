import React, { useState, useRef, useEffect } from 'react'

import { DateTimePicker as MuiDateTimePicker } from '@mui/lab'
import {
  Box,
  FormControl,
  FormLabel,
  FormHelperText,
  InputAdornment,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import clsx from 'clsx'
import { PropTypes } from 'prop-types'

import Icon from '~/components/Icon'
import TextField from '~/components/TextField'
import { useClasses } from '~/themes'

import style from './style'

const DateTimePicker = ({
  label,
  placeholder,
  value,
  onChange,
  onTouch,
  error,
  disabled,
  helperText,
  vertical,
  required,
  labelWidth,
  ...props
}) => {
  const classes = useClasses(style)
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  const ref = useRef(false)

  useEffect(() => {
    if (ref.current !== open) {
      if (ref.current) {
        onTouch(true)
        return
      }
      ref.current = open
    }
  }, [open])

  return (
    <FormControl
      className={clsx(classes.formControl, {
        [classes.vertical]: vertical,
        [classes.horizontal]: !vertical && !!label,
      })}
      fullWidth
      error={error}
    >
      {label && (
        <FormLabel
          required={required}
          sx={{ ...(vertical ? {} : { width: labelWidth }) }}
        >
          {label}
        </FormLabel>
      )}

      <Box sx={{ flex: 1 }}>
        <MuiDateTimePicker
          open={open}
          onClose={() => setOpen(false)}
          label={label}
          value={value}
          onChange={onChange}
          PaperProps={{
            classes: {
              root: classes.paper,
            },
          }}
          PopperProps={{
            placement: 'bottom-start',
          }}
          renderInput={(params) => {
            return (
              <Box ref={params.inputRef}>
                <TextField
                  onClick={() => {
                    if (!disabled) setOpen(true)
                  }}
                  value={params.inputProps.value}
                  disabled={disabled}
                  readOnly
                  vertical
                  placeholder={placeholder}
                  error={error}
                  className={classes.textField}
                  endAdornment={
                    <>
                      {value && (
                        <InputAdornment
                          position="end"
                          sx={{
                            display: 'none',
                            pr: '5px',
                            cursor: disabled ? 'unset' : 'pointer',
                          }}
                          onClick={(e) => {
                            e.stopPropagation()
                            onChange(null)
                          }}
                        >
                          <Icon name="close" size={12} />
                        </InputAdornment>
                      )}
                      <InputAdornment
                        position="end"
                        sx={{
                          pr: '10px',
                          cursor: disabled ? 'unset' : 'pointer',
                        }}
                      >
                        <Icon name="calendar" />
                      </InputAdornment>
                    </>
                  }
                  sx={{
                    '& input': {
                      cursor: disabled ? 'unset' : 'pointer',
                    },
                    '& fieldset': {
                      borderColor: error
                        ? `${theme.palette.error.main} !important`
                        : open
                        ? `${theme.palette.borderField} !important`
                        : theme.palette.grayF4.main,
                    },
                    ...(!error &&
                      (open
                        ? {}
                        : {
                            '&:hover fieldset': {
                              borderColor: `${theme.palette.borderField} !important`,
                            },
                          })),
                  }}
                />
              </Box>
            )
          }}
          {...props}
        />
        {error && !!helperText && (
          <FormHelperText error>{helperText}</FormHelperText>
        )}
      </Box>
    </FormControl>
  )
}

DateTimePicker.defaultProps = {
  placeholder: '',
  label: '',
  value: null,
  onChange: () => {},
  onTouch: () => {},
  error: false,
  helperText: '',
  disabled: false,
  vertical: false,
  required: false,
  labelWidth: 160,
}

DateTimePicker.propTypes = {
  placeholder: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onTouch: PropTypes.func,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  disabled: PropTypes.bool,
  vertical: PropTypes.bool,
  required: PropTypes.bool,
  labelWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

export default DateTimePicker
