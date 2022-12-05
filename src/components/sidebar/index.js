import GlobalMenu from './globalMenu'

const { Box } = require('@mui/material')

function SideBar() {
  return (
    <Box
      sx={{
        position: 'relative',
      }}
    >
      <GlobalMenu />
    </Box>
  )
}

export default SideBar
