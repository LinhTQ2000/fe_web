import PropTypes from 'prop-types'
import { useFormContext, useFieldArray } from 'react-hook-form'

function FieldArray({ name, render }) {
  const { control } = useFormContext()
  const { fields, append, remove, insert, swap, move } = useFieldArray({
    name,
    control,
  })

  return <>{render({ fields, append, remove, insert, swap, move })}</>
}

FieldArray.defaultProps = {
  render: () => {},
}

FieldArray.propTypes = {
  render: PropTypes.func,
  name: PropTypes.string,
}

export default FieldArray
