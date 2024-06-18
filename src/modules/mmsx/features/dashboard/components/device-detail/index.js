import { Box } from '@mui/material'

import { useClasses } from '~/themes'

import DevicePanel from '../device-using-status/device-panel'
import style from '../device-using-status/style'

function DeviceDetail({ data }) {
  const classes = useClasses(style)
  return (
    <>
      <Box className={classes.stageHeader}>
        <span className="text">{data?.area?.name}</span>
      </Box>
      <Box className={classes.stage}>
        {data?.devices?.map((device, index) => (
          <DevicePanel key={index} device={device} />
        ))}
      </Box>
    </>
  )
}

export default DeviceDetail
