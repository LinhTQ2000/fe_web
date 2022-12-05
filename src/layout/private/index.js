import { Box } from '@mui/material'
import PropTypes from 'prop-types'
import SideBar from 'src/components/sidebar'

const PrivateLayout = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        overflow: 'hidden',
        height: '100%',
      }}
    >
      <SideBar />
      <Box sx={{ flex: 1, overflow: 'hidden' }}>{children}</Box>
    </Box>
  )
}

PrivateLayout.defaultProps = {
  children: null,
}

PrivateLayout.propTypes = {
  children: PropTypes.node,
}

export default PrivateLayout
