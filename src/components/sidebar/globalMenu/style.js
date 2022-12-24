import { useTheme } from '@emotion/react'
import { List } from '@mui/material'
import { styled } from '@mui/system'

export const ListMenuStyled = styled(List)(() => {
  const theme = useTheme()
  return {
    '.active': {
      background: theme.palette.bgPrimaryOpacity,
      fontWeight: 'bold',
      borderRadius: '3px 0px 0px 3px',
      borderLeft: 'solid blue 3px',
      '&:hover': {
        background: theme.palette.bgPrimaryOpacity,
      },
    },
    a: {
      textDecoration: 'none',
    },
  }
})
