import React from 'react'

import { Box } from '@mui/material'

import { useClasses } from '~/themes'

import style from './style'

function DeviceItem({ device = {} }) {
  const { activeTime, serial, deviceStatus } = device
  const classes = useClasses(style)

  const cssEnum = {
    0: 'activation',
    1: 'stop',
    2: 'error',
    3: 'off-maintain',
  }
  return (
    <Box className={classes.deviceContainer} title={serial}>
      <Box className={classes.devicePanel}>
        <Box className="title">{serial}</Box>
        <Box className={`data ${cssEnum[deviceStatus]}`}>{activeTime}</Box>
      </Box>
    </Box>
  )
}

export default DeviceItem
