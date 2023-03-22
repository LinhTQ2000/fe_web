import React from 'react'

import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

/**
 *
 * @param {object} props
 * @param {boolean} props.open Loading overlay is active?
 * @returns {*}
 */
const Loading = ({ open, sx = {} }) => {
  return (
    <Backdrop
      open={open}
      sx={{ zIndex: (theme) => theme.zIndex.modal + 10, ...sx }}
    >
      <CircularProgress color="primary" />
    </Backdrop>
  )
}

export default Loading
