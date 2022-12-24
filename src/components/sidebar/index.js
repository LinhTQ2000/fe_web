import { routes } from 'src/modules/client/routers'

import GlobalMenu from './globalMenu'

const { Box } = require('@mui/material')

function SideBar() {
  return (
    <Box
      sx={{
        position: 'relative',
      }}
    >
      <GlobalMenu routes={routes.filter((route) => route.isInSidebar)} />
    </Box>
  )
}

export default SideBar
